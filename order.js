const order = new Map();
const orderItems = document.getElementById("orderItems");
const orderTotal = document.getElementById("orderTotal");
const emptyOrder = document.getElementById("emptyOrder");
const orderStatus = document.getElementById("orderStatus");

function renderOrder() {
    let total = 0;
    orderItems.replaceChildren();

    for (const [name, item] of order) {
        total += item.price * item.quantity;
        const row = document.createElement("li");
        row.className = "order-item";

        const details = document.createElement("span");
        details.textContent = `${item.quantity} × ${name}`;
        const price = document.createElement("strong");
        price.textContent = `₱${item.price * item.quantity}`;
        row.append(details, price);
        orderItems.append(row);
    }

    orderTotal.textContent = `₱${total}`;
    emptyOrder.hidden = order.size > 0;
}

document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
        const { item, price } = button.dataset;
        const current = order.get(item);
        order.set(item, {
            price: Number(price),
            quantity: current ? current.quantity + 1 : 1
        });
        orderStatus.textContent = `${item} added to your order.`;
        renderOrder();
    });
});

document.getElementById("orderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (order.size === 0) {
        orderStatus.textContent = "Add at least one menu item before placing your order.";
        return;
    }

    const customer = document.getElementById("orderName").value.trim();
    const method = document.getElementById("orderMethod").value.toLowerCase();
    orderStatus.textContent = `Thanks, ${customer}! Your ${method} order is ready in this demo. No payment or order has been sent.`;
});

renderOrder();
