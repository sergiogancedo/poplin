<script>

document.addEventListener("DOMContentLoaded", async function () {
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

    // Fetch ZIP codes from the external JSON file
    let zipcodes = new Set();
    try {
        const response = await fetch("https://raw.githubusercontent.com/sergiogancedo/poplin/refs/heads/main/zip-codes-2.json");
        const data = await response.json();
        zipcodes = new Set(data.zipcodes);
    } catch (error) {
        console.error("Failed to load ZIP codes:", error);
        return;
    }

    function isValidZip(zip) {
        return zipcodes.has(zip);
    }

    zipError.style.display = "none";

    zipInput.addEventListener("input", function () {
        zipInput.value = zipInput.value.replace(/\D/g, "");
        if (zipInput.value.length === 5) {
            zipError.style.display = "none";
            zipInput.style.borderColor = "#c0afe2";
        }
    });

    zipCheckArea.addEventListener("click", function () {
        const zipCodeValue = zipInput.value.trim();

        if (zipCodeValue.length < 5) {
            zipError.style.display = "flex";
            zipInput.style.borderColor = "#F5013D";
            return;
        }

        if (isValidZip(zipCodeValue)) {
            zipInput.style.borderColor = "#299356";
            zipTitle.textContent = "Perfect, we're in your area!";
            zipCheckerCreateAccount.style.display = "flex";
        } else {
            zipInput.style.borderColor = "#F5013D";
            zipTitle.textContent = "Sorry, we're not in your area yet.";
        }

        zipCheckArea.style.display = "none";
        zipCheckerAnotherCode.style.display = "flex";
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const zipCodeValue = zipInput.value.trim();
        if (zipCodeValue.length !== 5 || isNaN(zipCodeValue)) {
            zipInput.style.borderColor = "#F5013D";
            zipTitle.textContent = "Sorry, we're not in your area yet.";
            return;
        }

        if (isValidZip(zipCodeValue)) {
            zipInput.style.borderColor = "#299356";
            zipTitle.textContent = "Perfect, we're in your area!";
            zipCheckerCreateAccount.style.display = "flex";
        } else {
            zipInput.style.borderColor = "#F5013D";
            zipTitle.textContent = "Sorry, we're not in your area yet.";
        }
    });

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
