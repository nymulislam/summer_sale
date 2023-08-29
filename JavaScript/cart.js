// Modal Refresh
function refresh() {
    window.location.reload(true);
}

// Apply coupon condition
let isCouponUsed = false;
document.getElementById('coupon_input').addEventListener('keyup', function (e) {
    const couponInput = e.target.value;
    const applyBtn = document.getElementById('discount-btn');

    !isCouponUsed && couponInput === 'SELL200'? applyBtn.removeAttribute('disabled') : applyBtn.setAttribute('disabled', true);
});

document.getElementById('discount-btn').addEventListener('click', function () {
    const couponInput = document.getElementById('coupon_input').value;
    if (couponInput === 'SELL200' && !isCouponUsed) {
        isCouponUsed = true;

        document.getElementById('coupon_input').setAttribute('disabled', true);
        document.getElementById('discount-btn').setAttribute('disabled', true);

        document.getElementById('coupon_input').value = '';
        applyDiscount();
    }
});

// Access card
function addCard(target) {
    const itemsName = target.childNodes[1].childNodes[3].childNodes[3].innerText;

    const addCart = document.getElementById('added_items');
    const itemsCount = addCart.childElementCount;
    const createHtml = document.createElement('p');
    createHtml.innerHTML = `<strong>${itemsCount + 1}. ${itemsName}</strong>`
    addCart.appendChild(createHtml);

    const itemsPrice = parseFloat(target.childNodes[1].childNodes[3].childNodes[5].innerText.split(" ")[0]);

    const calculatePrice = document.getElementById('calculate_price');
    const getPrice = parseFloat(calculatePrice.innerText);

    const totalPrice = getPrice + itemsPrice;
    calculatePrice.innerText = totalPrice;

    // Purchase button enabled
    const purchaseBtn = document.getElementById('purchase-btn')
    if (totalPrice > 0) {
        purchaseBtn.removeAttribute('disabled')
    }

    const finalAmount = document.getElementById('final-amount')
    finalAmount.innerText = totalPrice;
}

// Apply discount function
function applyDiscount() {
    const calculatePrice = document.getElementById('calculate_price');
    const totalPrice = parseFloat(calculatePrice.innerText);

    if (totalPrice >= 200) {
        const discountPercentage = 0.2;
        const discountAmount = totalPrice * discountPercentage;

        const discountElement = document.getElementById('discount');
        discountElement.innerText = discountAmount.toFixed(2);

        const finalAmount = document.getElementById('final-amount');
        const newFinalAmount = (totalPrice - discountAmount).toFixed(2);
        finalAmount.innerText = newFinalAmount;
    }
}