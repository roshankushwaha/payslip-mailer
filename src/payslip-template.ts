export function generatePayslip(emp: any) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f5f6f8;
      font-family: Arial, Helvetica, sans-serif;
      color: #111;
    }

    .wrapper {
      width: 100%;
      padding: 24px 0;
    }

    .container {
      width: 100%;
      max-width: 820px;
      margin: auto;
      background: #ffffff;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    h1 {
      margin: 0;
      font-size: 20px;
      letter-spacing: 0.4px;
    }

    h2 {
      margin: 6px 0 0;
      font-size: 14px;
      font-weight: normal;
      color: #555;
    }

    .divider {
      border-top: 1px solid #e0e0e0;
      margin: 20px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    td, th {
      padding: 8px 6px;
      vertical-align: top;
    }

    th {
      text-align: left;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
    }

    .label {
      color: #555;
      font-weight: bold;
      width: 140px;
    }

    .right {
      text-align: right;
    }

    .section-title {
      font-weight: bold;
      font-size: 14px;
      padding-bottom: 6px;
    }

    .total-row td {
      border-top: 1px solid #ddd;
      font-weight: bold;
      padding-top: 10px;
    }

    .net-pay {
      background: #f1f3f6;
      padding: 14px;
      border-radius: 6px;
      margin-top: 16px;
      font-size: 15px;
      font-weight: bold;
    }

    .footer {
      margin-top: 24px;
      text-align: center;
      font-size: 11px;
      color: #666;
      line-height: 1.5;
    }

    @media (max-width: 600px) {
      .container {
        padding: 16px;
      }

      table, td, th {
        font-size: 12px;
      }

      .label {
        width: 120px;
      }
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <!-- HEADER -->
      <table>
        <tr>
          <td>
            <h1>PERFECTKODE SOFTWARE TECHNOLOGIES LLP</h1>
            <h2>Payslip for ${emp["Payslip Month"]}</h2>
          </td>
        </tr>
      </table>

      <div class="divider"></div>

      <!-- EMPLOYEE DETAILS -->
      <table>
        <tr>
          <td class="label">Name</td>
          <td>${emp["Employee Name"]}</td>
          <td class="label">Emp. No</td>
          <td>${emp["Employee ID"]}</td>
        </tr>
        <tr>
          <td class="label">Designation</td>
          <td>${emp["Designation"]}</td>
          <td class="label">Department</td>
          <td>${emp["Department"]}</td>
        </tr>
      </table>

      <div class="divider"></div>

      <!-- EARNINGS & DEDUCTIONS -->
      <table>
        <tr>
          <th>Earnings</th>
          <th class="right">Amount</th>
          <th>Deductions</th>
          <th class="right">Amount</th>
        </tr>

        <tr>
          <td>Basic Salary</td><td class="right">₹${emp["Basic Salary"]}</td>
          <td>Provident Fund (PF)</td><td class="right">₹${emp["Provident Fund (PF)"]}</td>
        </tr>
        <tr>
          <td>HRA</td><td class="right">₹${emp["House Rent Allowance (HRA)"]}</td>
          <td>PF Deduction</td><td class="right">₹${emp["PF Deduction"]}</td>
        </tr>
        <tr>
          <td>DA</td><td class="right">₹${emp["Dearness Allowance (DA)"]}</td>
          <td>Professional Tax</td><td class="right">₹${emp["Professional Tax"]}</td>
        </tr>
        <tr>
          <td>Conveyance</td><td class="right">₹${emp["Conveyance Allowance"]}</td>
          <td>TDS</td><td class="right">₹${emp["TDS"]}</td>
        </tr>
        <tr>
          <td>Medical</td><td class="right">₹${emp["Medical Allowance"]}</td>
          <td>Loan Deduction</td><td class="right">₹${emp["Loan Deduction"]}</td>
        </tr>
        <tr>
          <td>Special Allowance</td><td class="right">₹${emp["Special Allowance"]}</td>
          <td>Other Deduction</td><td class="right">₹${emp["Other Deduction"]}</td>
        </tr>
        <tr>
          <td>Other Allowance</td><td class="right">₹${emp["Other Allowance"]}</td>
          <td></td><td></td>
        </tr>

        <tr class="total-row">
          <td>Gross Salary</td>
          <td class="right">₹${emp["Gross Salary"]}</td>
          <td>Total Deductions</td>
          <td class="right">₹${emp["Total Deductions"]}</td>
        </tr>
      </table>

      <!-- NET PAY -->
      <div class="net-pay">
        Net Pay: ₹${emp["Net Pay"]}
      </div>

      <p style="margin-top:8px;font-size:13px;">
        <strong>Amount in Words:</strong> ${emp["Net Pay (In Words)"]}
      </p>

      <!-- FOOTER -->
      <div class="footer">
        This is a system-generated payslip and does not require a signature.<br />
        Generated on: ${emp["Generated Date"] || new Date().toDateString()}
      </div>

    </div>
  </div>
</body>
</html>
`;
}
