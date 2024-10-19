function fetchProducts() {
    return [
        {
            title: "Написать песню",
            cost: 2000
        },
        {
            title: "Цветы",
            variants: [
                {
                    title: "Розы",
                    cost: 3300
                },
                {
                    title: "Пионы",
                    cost: 2750
                },
                {
                    title: "Ромашки",
                    cost: 1490
                }
            ],
            cost: 1080
        },
        {
            title: "Сладости",
            cost: 1000,
            features: [
                {
                    title: "Шоколад",
                    cost: 90
                },
                {
                    title: "Мармелад",
                    cost: 57
                },
                {
                    title: "Печенье с предсказаниями",
                    cost: 200
                }
            ]
        },
        {
            title: "Украшения",
            variants: [
                {
                    title: "Серебро",
                    cost: 800
                },
                {
                    title: "Золото",
                    cost: 1200
                }
            ],
            cost: 2000,
            features: [
                {
                    title: "Кольцо",
                    cost: 600
                },
                {
                    title: "Браслет",
                    cost: 800
                },
                {
                    title: "Серьги",
                    cost: 1100
                },
                {
                    title: "Цепочка",
                    cost: 750
                }
            ]
        }
    ];
}

function addFeature(container, idx, feature) {
    var labelElement = document.createElement("label");
    labelElement.setAttribute("for", "feature-" + idx);
    labelElement.textContent = feature.title;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "feature-" + idx;
    checkbox.id = "feature-" + idx;

    var myradio = document.createElement("div");
    myradio.className = "mycheck";
    myradio.appendChild(checkbox);
    myradio.appendChild(labelElement);

    container.appendChild(myradio);
}

function displayFeatures(productIndex) {
    var featureContainer = document.getElementById("features");
    featureContainer.innerHTML = "";

    var selectedProduct = fetchProducts()[productIndex];
    if (selectedProduct.features) {
        selectedProduct.features.forEach(function (feature, idx) {
            addFeature(featureContainer, idx, feature);
        });
    }
}

function addVariant(container, idx, variant) {
    var optionElement = document.createElement("option");
    optionElement.value = idx;
    optionElement.textContent = variant.title;

    container.appendChild(optionElement);
}

function displayVariants(productIndex) {
    var variantContainer = document.getElementById("variants");
    variantContainer.innerHTML = "";

    var selectedProduct = fetchProducts()[productIndex];
    if (selectedProduct.variants) {
        var selectElement = document.createElement("select");
        selectElement.name = "variant";
        addVariant(selectElement, NaN, { title: "-", cost: 0 });

        selectedProduct.variants.forEach(function (variant, idx) {
            addVariant(selectElement, idx, variant);
        });
        variantContainer.appendChild(selectElement);
    }
}

function handleProductSelection(event) {
    var productIndex = parseInt(event.target.value, 10);
    displayVariants(productIndex);
    displayFeatures(productIndex);
}

function addProduct(container, idx, product) {
    var labelElement = document.createElement("label");
    labelElement.setAttribute("for", "product-" + idx);
    labelElement.textContent = product.title;

    var radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "product";
    radioButton.value = idx;
    radioButton.id = "product-" + idx;

    var myradio = document.createElement("div");
    myradio.className = "myradio";
    myradio.appendChild(radioButton);
    myradio.appendChild(labelElement);

    container.appendChild(myradio);
}

function isPositiveInteger(value) {
    return /^\d+$/.test(value);
}

function computeTotal() {
    var selectedProduct = document.querySelector("#products input[type=radio]:checked");
    if (!selectedProduct) {
        return;
    }
    selectedProduct = fetchProducts()[parseInt(selectedProduct.value, 10)];

    var totalPrice = selectedProduct.cost;
    if (selectedProduct.variants) {
        const sel = document.querySelector("#variants select")?.value;
        if (sel) {
            var selectedVariant = parseInt(sel, 10);
            if (!isNaN(selectedVariant)) {
                totalPrice += selectedProduct.variants[selectedVariant].cost;
            }
        }
    }

    if (selectedProduct.features) {
        var selectedFeatures = document.querySelectorAll("#features input[type=checkbox]");
        selectedFeatures.forEach(function (feature, idx) {
            if (feature.checked) {
                totalPrice += selectedProduct.features[idx].cost;
            }
        });
    }

    var output;
    var quantity = document.getElementById("quantity").value;
    if (!isPositiveInteger(quantity)) {
        output = "Введите количество!!!";
    } else {
        output = totalPrice * parseInt(quantity, 10);
    }

    document.getElementById("output").textContent = "Цена: " + output;
}

window.addEventListener("DOMContentLoaded", function () {
    var productContainer = document.getElementById("products");
    fetchProducts().forEach(function (product, idx) {
        addProduct(productContainer, idx, product);
    });
    productContainer.addEventListener("change", handleProductSelection);

    document.querySelector("form").addEventListener("input", computeTotal);
});
