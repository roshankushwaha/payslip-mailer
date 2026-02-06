# Payslip Mailer

This project is a Node.js application designed to automate the mailing of payslips to employees. It allows you to upload an Excel file containing employee and payslip information, generate individual payslips, and send them via email.

## Table of Contents

*   [Installation](#installation)
*   [Running the project](#running-the-project)
    *   [Development](#development)
    *   [Production](#production)
*   [Usage](#usage)

## Installation

To install the project dependencies, navigate to the project's root directory and run the following command:

```bash
npm install
```

## Running the project

### Development

To run the project in development mode with hot-reloading, use:

```bash
npm run dev
```

This command utilizes `ts-node` to execute the TypeScript source files directly, providing a fast feedback loop during development.

### Production

To run the project in production mode, which involves compiling the TypeScript code and then starting the server, follow these steps:

1.  **Build the project:**

    ```bash
    npm run build
    ```

    This command compiles all TypeScript files into JavaScript and outputs the compiled code to the `dist` directory.

2.  **Start the server:**

    ```bash
    npm start
    ```

    This command runs the compiled JavaScript application from the `dist` directory. The `npm start` script automatically includes the build step, so you can often just run `npm start` directly if you have made changes.

## Usage

Once the server is running (either in development or production mode), you can access the application through your web browser.

1.  **Access the application:**
    Open your web browser and navigate to `http://localhost:3000`.

2.  **Upload Employee Data:**
    *   On the application interface, click the **"Select Excel"** button.
    *   Choose an Excel file that contains the employee information and payslip data. Ensure your Excel file is correctly formatted with columns like "Employee Email", "Net Pay", "Payslip Month", etc. (refer to `src/payslip-template.ts` for expected data fields).
    *   After selecting the file, click the **"Upload"** button.

3.  **Review Employee Details:**
    The application will parse the Excel file and display the employee data in a table format. Review the details to ensure they are correct.

4.  **Send Emails:**
    Once you have confirmed the details are accurate, click the **"Send Email"** button.

5.  **Monitor Email Status:**
    The table will update in real-time, showing the status for each employee's email. Possible statuses include:
    *   **"Sending"**: The email is currently being processed for dispatch.
    *   **"Sent"**: The email has been successfully sent.
    *   **"Failed"**: The email could not be sent (e.g., due to an incorrect email address or a server issue).

Please ensure your `.env` file is configured with the necessary email credentials for the mailer to function correctly. A `.env.example` file is provided for reference.
