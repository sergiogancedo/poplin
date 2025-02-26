<script>
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("wf-form-Zip-Code");
    const zipInput = document.getElementById("zip-code-input");
    const zipError = document.getElementById("zip-error");
    const zipTitle = document.getElementById("zip-code-title");
    const zipCheckArea = document.getElementById("zip-code-check-area");
    const zipCheckerCreateAccount = document.getElementById("zip-checker-create-account");
    const zipCheckerAnotherCode = document.getElementById("zip-checker-another-code");

    if (!form || !zipInput || !zipError || !zipTitle || !zipCheckArea || !zipCheckerCreateAccount || !zipCheckerAnotherCode) {
        console.error("One or more required elements are missing. Check your HTML IDs.");
        return;
    }

    // Set of allowed ZIP codes
    const zipcodes = new Set([
        '05401', '27215', '27253', '27217', '27302', '01540', '01570', '06255', '02019', '01550', '02895', '01507',
        '01529', '01527', '06260', '02864', '39465', '39401', '39402', '78626', '78641', '76537', '78628', '78738',
        '16503', '37408', '37421', '37416', '30741', '37404', '30720', '37379', '30736', '37415', '37410', '37406',
        '30721', '30755', '37343', '37403', '27377', '02859', '02857', '01590', '02830', '01571', '37341', '37402',
        '37405', '30739', '37363', '37312', '30710', '27301', '02814', '02917', '78633', '30725', '37412', '30707',
        '30742', '10027', '10454', '10026', '10032', '10035', '10039', '10024', '10451', '10025', '95037', '19335',
        '19320', '15066', '15009', '01562', '39437', '30752', '01566', '78642', '16504', '37377', '10128', '10037',
        '10030', '11102', '15074', '27298', '37302', '16117', '47710', '47630', '47715', '47711', '25701', '41102',
        '43232', '43035', '43235', '43211', '43110', '43201', '43125', '43231', '43219', '43204', '43220', '43081',
        '43228', '43229', '43202', '43130', '43023', '43207', '43147', '43230', '43062', '43209', '43123', '43215',
        '43015', '43205', '43227', '43016', '43017', '43119', '27258', '02896', '37409', '45669', '43064', '43026',
        '43222', '43224', '43004', '43065', '01569', '25530', '43217', '43214', '43221', '43021', '43082', '43054',
        '43085', '27214', '06281', '27231', '30750', '25704', '07020', '15601', '27244', '15666', '16501', '43074',
        '27320', '01521', '01516', '11961', '57703', '57701', '57702', '83402', '83401', '83404', '83440', '29483',
        '29418', '29461', '29407', '29456', '29410', '29420', '29464', '29486', '29485', '29406', '29405', '29445',
        '29455', '29412', '29403', '29466', '29492', '29449', '07047', '11105', '16157', '99645', '30650', '29401',
        '11786', '94568', '94566', '94582', '94550', '94583', '94588', '18705', '18702', '18612', '18704', '18640',
        '18706', '18634', '80537', '80513', '80503', '80501', '80534', '80543', '07601', '07006', '07108', '07011'
    ]);

    // Function to check if a ZIP code exists in the set
    function isValidZip(zip) {
        return zipcodes.has(zip);
    }

    // Initially hide the error message
    zipError.style.display = "none";

    // Allow only numbers in input field
    zipInput.addEventListener("input", function () {
        zipInput.value = zipInput.value.replace(/\D/g, ""); // Remove any non-digit characters

        if (zipInput.value.length === 5) {
            // If input is exactly 5 digits, reset the error state
            zipError.style.display = "none";
            zipInput.style.borderColor = "#c0afe2"; // Reset border color
        }
    });

    // Check ZIP when clicking "Check Your Area"
    zipCheckArea.addEventListener("click", function () {
        const zipCodeValue = zipInput.value.trim();

        if (zipCodeValue.length < 5) {
            // If less than 5 digits, show error state
            zipError.style.display = "flex";
            zipInput.style.borderColor = "#F5013D"; // Red border for error
            return;
        }

        if (isValidZip(zipCodeValue)) {
            // ✅ ZIP Code is valid
            zipInput.style.borderColor = "#299356"; // Green border for success
            zipTitle.textContent = "Perfect, we're in your area!"; // Update title
            zipCheckerCreateAccount.style.display = "flex"; // Show create account section
        } else {
            // ❌ ZIP Code is incorrect
            zipInput.style.borderColor = "#F5013D"; // Red border for error
            zipTitle.textContent = "Sorry, we're not in your area yet."; // Update title
        }

        // ✅ Hide ZIP check area and show the option to enter another ZIP code
        zipCheckArea.style.display = "none";
        zipCheckerAnotherCode.style.display = "flex";
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop Webflow from processing the form
        event.stopImmediatePropagation(); // Extra precaution to stop default behavior

        const zipCodeValue = zipInput.value.trim();

        if (zipCodeValue.length !== 5 || isNaN(zipCodeValue)) {
            // ❌ ZIP Code is invalid (not 5 digits)
            zipInput.style.borderColor = "#F5013D"; // Red border for error
            zipTitle.textContent = "Sorry, we're not in your area yet."; // Update title
            return; // Stop execution here (don't process further)
        }

        if (isValidZip(zipCodeValue)) {
            // ✅ ZIP Code is valid
            zipInput.style.borderColor = "#299356"; // Green border for success
            zipTitle.textContent = "Perfect, we're in your area!"; // Update title
            zipCheckerCreateAccount.style.display = "flex"; // Show create account section
        } else {
            // ❌ ZIP Code is incorrect
            zipInput.style.borderColor = "#F5013D"; // Red border for error
            zipTitle.textContent = "Sorry, we're not in your area yet."; // Update title
        }
    });

    // Reset everything when clicking on #zip-checker-another-code
    zipCheckerAnotherCode.addEventListener("click", function () {
        zipInput.value = ""; 
        zipInput.style.borderColor = "#c0afe2"; 
        zipTitle.textContent = "Nationwide personal laundry service in over 500 cities"; 
        zipError.style.display = "none"; 

        zipCheckArea.style.display = "flex"; 
        zipCheckerCreateAccount.style.display = "none"; 
        zipCheckerAnotherCode.style.display = "none"; 
    });
});
</script>
