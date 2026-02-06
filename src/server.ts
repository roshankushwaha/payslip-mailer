import "dotenv/config";
import express from "express";
import path from "path";
import multer from "multer";
import XLSX from "xlsx";
import { transporter } from "./mailer.js";
import { generatePayslip } from "./payslip-template.js";
import { numberToWords } from "./number-to-words.js";

const app = express();
const PORT = 3000;

// ===== Memory-only upload =====
const upload = multer({ storage: multer.memoryStorage() });

// ===== In-memory stores =====
let employeesCache: any[] = [];
let clients: express.Response[] = [];

// ===== Serve UI =====
app.get("/", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/index.html"));
});

// ===== Upload & parse Excel =====
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]!];
    const parsedEmp = XLSX.utils.sheet_to_json(sheet!);

    const employees = parsedEmp.map((emp: any) => ({
        ...emp as any,
        "Net Pay (In Words)": numberToWords(Number(emp['Net Pay']))
    }))
    employeesCache = employees;
    console.log("Employees cached:", employeesCache.length);
    res.json(employees);
});

// ===== SSE (Live status updates) =====
app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    clients.push(res);

    req.on("close", () => {
        clients = clients.filter(c => c !== res);
    });
});

function sendEvent(data: any) {
    clients.forEach(client => {
        client.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}

app.post("/send", async (_req, res) => {
    if (!employeesCache.length) {
        return res.status(400).json({ error: "No employees loaded" });
    }

    // respond immediately
    res.json({ ok: true });

    for (const emp of employeesCache) {
        const email = emp["Employee Email"];

        const html = generatePayslip(emp);

        sendEvent({ email, status: "Sending" });

        try {
            const info = await transporter.sendMail({
                to: email,
                subject: `Payslip – ${emp["Payslip Month"]}`,
                html
            });
            sendEvent({ email, status: "Sent" });
            console.log(`✅ Email sent → ${email}`);
            console.log("Detailed Info", info);
        } catch (err) {
            console.error("Mail failed:", email, err);
            sendEvent({ email, status: "Failed" });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
