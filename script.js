const content = document.getElementById("content");
const stepItems = document.querySelectorAll(".step-item");

let currentStep = 1;

const formData = {
  userName: "",
  email: "",
  phone: "",
  plan: "",
  billing: "monthly",
  addons: [],
};

const plans = [
  {
    name: "Arcade",
    icon: "./images/icon-arcade.svg",
    monthly: 9,
    yearly: 90,
  },
  {
    name: "Advanced",
    icon: "./images/icon-advanced.svg",
    monthly: 12,
    yearly: 120,
  },
  {
    name: "Pro",
    icon: "./images/icon-pro.svg",
    monthly: 15,
    yearly: 150,
  },
];

const addons = [
  {
    name: "Online Services",
    description: "Access to multiplayer games",
    monthly: 1,
    yearly: 10,
  },
  {
    name: "Larger Storage",
    description: "Extra 1TB of cloud save",
    monthly: 2,
    yearly: 20,
  },
  {
    name: "Customizable Profile",
    description: "Custom themes on your profile",
    monthly: 2,
    yearly: 20,
  },
];

/* -----------------------------
   STEP INDICATOR
----------------------------- */

function updateStepIndicators() {
  stepItems.forEach((item) => {
    const step = Number(item.dataset.step);

    item.classList.remove("is-active");
    item.classList.remove("is-completed");

    if (step === currentStep) {
      item.classList.add("is-active");
    }

    if (step < currentStep) {
      item.classList.add("is-completed");
    }
  });
}

/* -----------------------------
   RENDER CURRENT STEP
----------------------------- */

function renderStep() {
  updateStepIndicators();

  if (currentStep === 1) {
    renderPersonalInfo();
  }

  if (currentStep === 2) {
    renderSelectPlan();
  }

  if (currentStep === 3) {
    renderAddons();
  }

  if (currentStep === 4) {
    renderSummary();
  }

  if (currentStep === 5) {
    renderThankYou();
  }
}

/* -----------------------------
   STEP 1
   PERSONAL INFORMATION
----------------------------- */

function renderPersonalInfo() {
  content.innerHTML = `
        <div class="step-heading">
            <h1>Personal Info</h1>

            <p>
                Please provide your name, email address,
                and phone number.
            </p>
        </div>

        <form id="info-form" novalidate>

            <div class="form-group">

                <label for="userName">
                    Name
                </label>

                <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="e.g. Stephen King"
                    value="${formData.userName}"
                >

                <span
                    class="error-message"
                    id="userName-error"
                ></span>

            </div>


            <div class="form-group">

                <label for="email">
                    Email Address
                </label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g. stephenking@lorem.com"
                    value="${formData.email}"
                >

                <span
                    class="error-message"
                    id="email-error"
                ></span>

            </div>


            <div class="form-group">

                <label for="phone">
                    Phone Number
                </label>

                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. +1 234 567 890"
                    value="${formData.phone}"
                >

                <span
                    class="error-message"
                    id="phone-error"
                ></span>

            </div>


            <div class="form-actions">

                <button
                    type="submit"
                    id="next-button"
                >
                    Next Step
                </button>

            </div>

        </form>
    `;

  document
    .getElementById("info-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      if (validateInfo()) {
        currentStep = 2;

        renderStep();
      }
    });
}

/* -----------------------------
   VALIDATION
----------------------------- */

function validateInfo() {
  const userName = document.getElementById("userName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  let valid = true;

  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = "";
  });

  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("input-error");
  });

  if (userName.value.trim() === "") {
    showError(userName, "This field is required");

    valid = false;
  }

  if (email.value.trim() === "") {
    showError(email, "This field is required");

    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, "Please enter a valid email address");

    valid = false;
  }

  if (phone.value.trim() === "") {
    showError(phone, "This field is required");

    valid = false;
  }

  if (valid) {
    formData.userName = userName.value.trim();
    formData.email = email.value.trim();
    formData.phone = phone.value.trim();
  }

  return valid;
}

function showError(input, message) {
  input.classList.add("input-error");

  const error = document.getElementById(`${input.name}-error`);

  error.textContent = message;
}

/* -----------------------------
   STEP 2
   SELECT PLAN
----------------------------- */

function renderSelectPlan() {
  content.innerHTML = `
        <div class="step-heading">

            <h1>Select your plan</h1>

            <p>
                You have the option of monthly or yearly billing.
            </p>

        </div>


        <div class="plans">

            ${plans
              .map((plan) => {
                const price =
                  formData.billing === "monthly" ? plan.monthly : plan.yearly;

                const duration = formData.billing === "monthly" ? "mo" : "yr";

                return `
                    <button
                        type="button"
                        class="plan_card ${
                          formData.plan === plan.name ? "selected" : ""
                        }"
                        data-plan="${plan.name}"
                    >

                        <img
                            src="${plan.icon}"
                            alt="${plan.name}"
                            class="plan-icon"
                        >

                        <span class="plan-details">

                            <strong>
                                ${plan.name}
                            </strong>

                            <small>
                                $${price}/${duration}
                            </small>

                            <span class="yearly-benefit">
                                ${
                                  formData.billing === "yearly"
                                    ? "2 months free"
                                    : ""
                                }
                            </span>

                        </span>

                    </button>
                `;
              })
              .join("")}

        </div>
              <p id="plan-error" class="plan-error"></p>

        <div class="billing-toggle">

            <span
                class="${formData.billing === "monthly" ? "active" : ""}"
            >
                Monthly
            </span>


            <button
                type="button"
                id="billing-toggle"
                class="toggle-switch ${
                  formData.billing === "yearly" ? "yearly" : ""
                }"
                aria-label="Toggle billing period"
            >

                <span></span>

            </button>


            <span
                class="${formData.billing === "yearly" ? "active" : ""}"
            >
                Yearly
            </span>

        </div>


        <div class="form-actions">

            <button
                type="button"
                class="back-button"
                id="back-button"
            >
                Go Back
            </button>


            <button
                type="button"
                id="next-button"
            >
                Next Step
            </button>

        </div>
    `;

  /* Plan selection */

  document.querySelectorAll(".plan_card").forEach((card) => {
    card.addEventListener("click", function () {
      document.querySelectorAll(".plan_card").forEach((item) => {
        item.classList.remove("selected");
      });

      this.classList.add("selected");
      formData.plan = this.dataset.plan;

      renderStep();
    });
  });

  /* Monthly / Yearly */

  document
    .getElementById("billing-toggle")
    .addEventListener("click", function () {
      if (formData.billing === "monthly") {
        formData.billing = "yearly";
      } else {
        formData.billing = "monthly";
      }

      renderStep();
    });

  /* Back */

  document.getElementById("back-button").addEventListener("click", function () {
    currentStep = 1;

    renderStep();
  });

  /* Next */

  document.getElementById("next-button").addEventListener("click", function () {
    if (formData.plan === "") {
      document.getElementById("plan-error").textContent =
        "Please select a plan";
      return;
    }
    currentStep = 3;

    renderStep();
  });
}

/* -----------------------------
   STEP 3
   ADD-ONS
----------------------------- */

function renderAddons() {
  content.innerHTML = `
        <div class="step-heading">

            <h1>Pick add-ons</h1>

            <p>
                Add-ons help enhance your gaming experience.
            </p>

        </div>


        <div class="addons">

            ${addons
              .map((addon) => {
                const selected = formData.addons.includes(addon.name);

                const price =
                  formData.billing === "monthly" ? addon.monthly : addon.yearly;

                const duration = formData.billing === "monthly" ? "mo" : "yr";

                return `
                    <button
                        type="button"
                        class="addon_card ${selected ? "selected" : ""}"
                        data-addon="${addon.name}"
                    >

                        <span class="addon-check">

                          <input
                            type="checkbox"
                            ${selected ? "checked" : ""}
                            aria-label="${addon.name}"
                          >

                        </span>


                        <span class="addon-details">

                            <strong>
                                ${addon.name}
                            </strong>

                            <small>
                                ${addon.description}
                            </small>

                        </span>


                        <span class="addon-price">
                            +$${price}/${duration}
                        </span>

                    </button>
                `;
              })
              .join("")}

        </div>


        <div class="form-actions">

            <button
                type="button"
                class="back-button"
                id="back-button"
            >
                Go Back
            </button>


            <button
                type="button"
                id="next-button"
            >
                Next Step
            </button>

        </div>
    `;

  /* Add-on selection */

  document.querySelectorAll(".addon_card").forEach((card) => {
    card.addEventListener("click", function () {
      const addonName = this.dataset.addon;
      const checkbox = this.querySelector('input[type="checkbox"]');

      if (formData.addons.includes(addonName)) {
        formData.addons = formData.addons.filter((name) => name !== addonName);

        this.classList.remove("selected");
        checkbox.checked = false;
      } else {
        formData.addons.push(addonName);

        this.classList.add("selected");
        checkbox.checked = true;
      }
    });
  });

  /* Back */

  document.getElementById("back-button").addEventListener("click", function () {
    currentStep = 2;

    renderStep();
  });

  /* Next */

  document.getElementById("next-button").addEventListener("click", function () {
    currentStep = 4;

    renderStep();
  });
}

/* -----------------------------
   PRICE FUNCTIONS
----------------------------- */

function getSelectedPlan() {
  return plans.find((plan) => plan.name === formData.plan);
}

function getSelectedAddons() {
  return addons.filter((addon) => formData.addons.includes(addon.name));
}

function getPrice(item) {
  if (formData.billing === "monthly") {
    return item.monthly;
  }

  return item.yearly;
}

function getDuration() {
  if (formData.billing === "monthly") {
    return "mo";
  }

  return "yr";
}

function getTotal() {
  const plan = getSelectedPlan();

  let total = getPrice(plan);

  getSelectedAddons().forEach((addon) => {
    total += getPrice(addon);
  });

  return total;
}

/* -----------------------------
   STEP 4
   SUMMARY
----------------------------- */

function renderSummary() {
  const plan = getSelectedPlan();

  const selectedAddons = getSelectedAddons();

  content.innerHTML = `
        <div class="step-heading">

            <h1>Finishing up</h1>

            <p>
                Double-check everything looks OK
                before confirming.
            </p>

        </div>


        <div class="summary-card">

            <div class="summary-plan">

                <div>

                    <strong>
                        ${plan.name}
                        (${capitalize(formData.billing)})
                    </strong>

                    <button
                        type="button"
                        class="change-plan"
                        id="change-plan"
                    >
                        Change
                    </button>

                </div>


                <strong>
                    $${getPrice(plan)}/${getDuration()}
                </strong>

            </div>


            <div class="summary-addons">

                ${
                  selectedAddons.length > 0
                    ? selectedAddons
                        .map((addon) => {
                          return `
                                <div class="summary-addon">

                                    <span>
                                        ${addon.name}
                                    </span>

                                    <span>
                                        +$${getPrice(addon)}/${getDuration()}
                                    </span>

                                </div>
                            `;
                        })
                        .join("")
                    : `
                            <p>
                                No add-ons selected
                            </p>
                        `
                }

            </div>

        </div>


        <div class="total">

            <span>
                Total (per ${formData.billing === "monthly" ? "month" : "year"})
            </span>

            <strong>
                $${getTotal()}/${getDuration()}
            </strong>

        </div>


        <div class="form-actions">

            <button
                type="button"
                class="back-button"
                id="back-button"
            >
                Go Back
            </button>


            <button
                type="button"
                id="next-button"
            >
                Confirm
            </button>

        </div>
    `;

  /* Change plan */

  document.getElementById("change-plan").addEventListener("click", function () {
    currentStep = 2;

    renderStep();
  });

  /* Back */

  document.getElementById("back-button").addEventListener("click", function () {
    currentStep = 3;

    renderStep();
  });

  /* Confirm */

  document.getElementById("next-button").addEventListener("click", function () {
    currentStep = 5;

    renderStep();
  });
}

/* -----------------------------
   STEP 5
   THANK YOU
----------------------------- */

function renderThankYou() {
  content.innerHTML = `
        <div class="thank-you">

            <img
                src="./images/icon-thank-you.svg"
                alt="Thank you"
                class="thank-icon"
            >

            <h1>Thank You!</h1>

            <p>
                Thanks for confirming your subscription!
                We hope you have fun using our platform.
                If you ever need support, please email
                support@example.com.
            </p>

        </div>
    `;
}

/* -----------------------------
   HELPER
----------------------------- */

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/* -----------------------------
   START APPLICATION
----------------------------- */

renderStep();
