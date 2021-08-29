var bill_amt = document.getElementsByClassName("bill-amount")[0];
var custom = document.getElementsByClassName("custom")[0];
var person_count = document.getElementsByClassName("person-count")[0];
var reset_btn = document.getElementsByClassName("reset-btn")[0];
var tip_sum = document.getElementsByClassName("tip-sum")[0];
var total_sum = document.getElementsByClassName("total-sum")[0];

var fiveperbtn = document.getElementsByClassName("five-percent")[0];
var tenperbtn = document.getElementsByClassName("ten-percent")[0];
var fifteenperbtn = document.getElementsByClassName("fifteen-percent")[0];
var twentyfiveperbtn = document.getElementsByClassName("twenty-five-percent")[0];
var fiftyperbtn = document.getElementsByClassName("fifty-percent")[0];

var typingTimer, tip_perc;
reset_btn.addEventListener("click", function() {
  bill_amt.value = "";
  person_count.value = "";
  tip_sum.innerHTML = "$0.00";
  total_sum.innerHTML = "$0.00";
  removeActiveStateFromAllButtons();

})
custom.addEventListener("keyup", function() {
  clearTimeout(typingTimer);
  removeActiveStateFromAllButtons();
  typingTimer = setTimeout(function() {

    tip_perc = parseFloat(custom.value) * .01;
    if (person_count.value !== "" && bill_amt.value !== "" && person_count.value !== "0") {
      tip_sum.innerHTML = "$" + (((parseFloat(bill_amt.value) * parseFloat(tip_perc)) / person_count.value).toFixed(2)).toString();
      total_sum.innerHTML = "$" + (((parseFloat(bill_amt.value) / parseFloat(person_count.value)) + parseFloat(tip_sum.innerHTML.substring(1))).toFixed(2)).toString();
    }
  }, 2000)
});
[fiveperbtn, tenperbtn, fifteenperbtn,
  twentyfiveperbtn, fiftyperbtn
].forEach(item => {
  item.addEventListener("click", function() {
    removeActiveStateFromAllButtons();
    item.classList.add("active-button");
    tip_perc = ((this.innerHTML).substring(0, this.innerHTML.length - 1)) * .01;
    if (person_count.value !== "" && bill_amt !== "") {
      tip_sum.innerHTML = "$" + (((parseFloat(bill_amt.value) * parseFloat(tip_perc)) / person_count.value).toFixed(2)).toString();
      total_sum.innerHTML = "$" + (((parseFloat(bill_amt.value) / parseFloat(person_count.value)) + parseFloat(tip_sum.innerHTML.substring(1))).toFixed(2)).toString();

    }
  })
});
[bill_amt, person_count].forEach(item => {
  item.addEventListener("keyup", function() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function() {

      if (person_count.value === "0") {
        person_count.classList.add("cant-be-zero");
        document.getElementsByClassName("cant-be-zero-text")[0].style.display = "inline-block";

      } else {
        person_count.classList.remove("cant-be-zero");
        document.getElementsByClassName("cant-be-zero-text")[0].style.display = "none";



      if (person_count.value !== "" && bill_amt.value !== "" && tip_perc !== null) {
        tip_sum.innerHTML = "$" + (((parseFloat(bill_amt.value) * parseFloat(tip_perc)) / person_count.value).toFixed(2)).toString();
        console.log(tip_sum.innerHTML);
        total_sum.innerHTML = "$" + (((parseFloat(bill_amt.value) / parseFloat(person_count.value)) + parseFloat(tip_sum.innerHTML.substring(1))).toFixed(2)).toString();
      }
      }
    }, 500)

  })
})

function removeActiveStateFromAllButtons() {
  fiveperbtn.classList.remove("active-button");
  tenperbtn.classList.remove("active-button")
  fifteenperbtn.classList.remove("active-button")
  twentyfiveperbtn.classList.remove("active-button")
  fiftyperbtn.classList.remove("active-button")
}
