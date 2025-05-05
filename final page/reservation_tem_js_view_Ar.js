const module_type = parseInt(document.querySelector(".main-container").getAttribute("data-schemaid"));
switch (module_type) {
    case 291:
        module = "oneway";
        module_ar = "رحلة";
        break;
    case 290:
        module = "roundtrip";
        module_ar = "رحلة";
        break;
    case 292:
        module = "multicity";
        module_ar = "رحلة";
        break;
    case 251:
        module = "hotel";
        module_ar = "الفندق";
        break;
    case 290251:
        module = "flightHotel";
        module_ar = "رحلة + الفندق";
        break;
    case 249:
        module = "tour";
        module_ar = "جولة";
        break;
    case 500:
        module = "cip";
        module_ar = "cip";
        break;
    case 139:
        module = "insurance";
        module_ar = "التأمين";
        break;
    case 250:
        module = "visa";
        module_ar = "فيزا";
        break;
    case 401:
        module = "train_oneway";
        module_ar = "يدرب";
        break;
    case 402:
        module = "train_roundtrip";
        module_ar = "يدرب";
        break;
    case 501:
        module = "TouristPanel";
        module_ar = "لوحة سياحية";
        break;
};
if (document.querySelector(".main-container").getAttribute("data-schemaid") == 251) {
    const rooms = JSON.parse(document.querySelector(".invoice-form").querySelector("input[name=roomSearch]").value);
    for (var i = 0; i < rooms.rooms.length; i++) {
        var child_count_age = rooms.rooms[i].childcountandage;
        var child_age_wb = "";
        var child_age_wob = "";
        var infant_age = "";
        var adult_count = "";
        var adult = "";
        var child_count_age_splited = child_count_age.split(',');
        for (var j = 1; j < child_count_age_splited.length; j++) {
            if (child_count_age_splited[j] > 2 && child_count_age_splited[j] <= 6) {
                child_age_wob = child_age_wob += child_count_age_splited[j] + ',';
                $(".without-bed").empty().html('(' + child_age_wob.slice(0, -1) + ' سنة)');

            } else if (child_count_age_splited[j] > 6 && child_count_age_splited[j] <= 12) {
                child_age_wb = child_age_wb += child_count_age_splited[j] + ',';
                $(".with-bed").empty().html('(' + child_age_wb.slice(0, -1) + ' سنة)');

            } else if (child_count_age_splited[j] >= 1 && child_count_age_splited[j] <= 2) {
                infant_age = infant_age += child_count_age_splited[j] + ',';
                $(".is-infant").empty().html('(' + infant_age.slice(0, -1) + ' سنة)');
            }
        }
    }
}

// bita
/*------------------START FUNCTION MULTI CURRENCY-----------------------*/
function currency_rate() {
    try {
        if (document.querySelector(".currency-unit").value == undefined) {
            console.log('no-unit')
        } else {
            var rate_unit = document.querySelector(".rate-unit").value;
            var rate_cost = document.querySelector(".rate-cost").value;
            var rate_floatdigit = document.querySelector(".rate-floatdigit").value;
            var total = document.querySelector(".total-section").getAttribute("data-output");
            var firstpay = document.querySelector(".firstpay-section").getAttribute("data-output");
            var commisson = document.querySelector(".commission-section").getAttribute("data-output");
            if (rate_cost != 1 && rate_cost != '') {
                exchange_currency(rate_unit, rate_cost, rate_floatdigit, commisson, 'commission');
                if (document.querySelector(".total-section").innerText.length > 0) {
                    exchange_currency(rate_unit, rate_cost, rate_floatdigit, total, 'total');
                }
                exchange_currency(rate_unit, rate_cost, rate_floatdigit, firstpay, 'firstpay');
                if (document.querySelector(".currency-section").innerText.length > 0) {
                    var currency = document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '');
                    exchange_currency(rate_unit, rate_cost, rate_floatdigit, currency, 'currency');
                }
            }

        }
    } catch (e) {
        return "";
    };
}
// bita
function exchange_currency(rate_unit, rate_cost, rate_floatdigit, price, element) {
    var currencySection = document.querySelector(".firstpay-section").getElementsByClassName("currency-section");
    var exchange_currency = 0;
    if (rate_floatdigit == '') {
        exchange_currency = price * rate_cost;
    } else {
        let toString_element = (price * rate_cost).toString();
        if (toString_element.indexOf('.') > -1) {
            let parseFloat_element = parseFloat(toString_element).toFixed(rate_floatdigit).toString();
            let parseFloat_element_split = parseFloat_element.split('.');
            if (parseFloat_element_split[1].indexOf('0') > -1) {
                exchange_currency = parseFloat(price * rate_cost).toFixed(1).toString();
            } else {
                exchange_currency = parseFloat(price * rate_cost).toFixed(rate_floatdigit).toString();
            }
        } else {
            exchange_currency = parseFloat(price * rate_cost).toFixed(rate_floatdigit).toString();
        }
    }
    if (currencySection.length > 0) {
        var currencySections = document.querySelectorAll(".currency-section");
        currencySections.forEach(function (section) {
            section.remove();
        });
    }
    if (element == "currency") {
        document.querySelector(".firstpay-section").innerHTML += `<div class="currency-section width_100" data-output="${exchange_currency}"><div class="width_50 float-right"></div><div class="width_50 float-left text-left"><span class="equal">==</span><span>${new Intl.NumberFormat().format(exchange_currency)}</span><span class="rate_unit unit-content">${rate_unit}</span></div></div>`;
    } else {
        document.querySelector("." + element + "-section").innerHTML += `<div class="currency-section width_100"><div class="width_50 float-right"></div><div class="width_50 float-left text-left"><span class="equal">==</span><span class="currency-result">${new Intl.NumberFormat().format(exchange_currency)}</span><span class="rate_unit unit-content">${rate_unit}</span></div></div>`;
    }
}
/*------------------END FUNCTION MULTI CURRENCY-----------------------*/

if (document.querySelector(".message-box-nodata")) {
    document.querySelector(".btns-container").querySelector(".next-btn").classList.add("unvisible");
    if (document.querySelector(".cips-info-content")) {
        document.querySelector(".cips-info-content").classList.add("unvisible");
    };
    if (document.querySelector(".passenger-notices-content")) {
        document.querySelector(".passenger-notices-content").classList.add("unvisible");
    }
  
};


//<!----------------START JS MESSAGE FOR ERRORCODE SHOWDETAIL---------------->
//<!----------------END JS MESSAGE FOR ERRORCODE SHOWDETAIL---------------->
//<!----------------START JS CONVERT PERSIAN DATE TO GREGORIAN DATE---------------->
JalaliDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};
JalaliDate.jalaliToGregorian = function (j_y, j_m, j_d) {
    j_y = parseInt(j_y);
    j_m = parseInt(j_m);
    j_d = parseInt(j_d);
    var jy = j_y - 979;
    var jm = j_m - 1;
    var jd = j_d - 1;

    var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
    for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

    j_day_no += jd;

    var g_day_no = j_day_no + 79;

    var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no = g_day_no % 146097;

    var leap = true;
    if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
        g_day_no--;
        gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
        g_day_no = g_day_no % 36524;

        if (g_day_no >= 365) g_day_no++;
        else leap = false;
    }

    gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461;

    if (g_day_no >= 366) {
        leap = false;

        g_day_no--;
        gy += parseInt(g_day_no / 365);
        g_day_no = g_day_no % 365;
    }

    for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
        g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    var gm = i + 1;
    var gd = g_day_no + 1;

    gm = gm < 10 ? "0" + gm : gm;
    gd = gd < 10 ? "0" + gd : gd;

    return [gy, gm, gd];
};
//<!----------------END JS CONVERT PERSIAN DATE TO GREGORIAN DATE---------------->
//<!----------------START JS DETAILS---------------->
if (document.querySelector(".main-container").getAttribute("data-schemaid") == 291 || document.querySelector(".main-container").getAttribute("data-schemaid") == 401) {
    let rout_length = document.getElementsByClassName("details-item").length;
    document.querySelector(".startTime").innerText = document.getElementsByClassName("details-item")[0]
        .querySelector(".exitTime").innerText;
    document.querySelector(".endTime").innerText = document.getElementsByClassName("details-item")[
        rout_length - 1].querySelector(".arrivalTime").innerText;
    if (rout_length > 1) {
        var el = document.querySelector(".duration-line");
        for (var i = 0; i < rout_length - 1; i++) {
            var abbr = document.getElementsByClassName("details-item")[i].querySelector(".endAirportDetail")
                .innerText;
            abbr = abbr.split("/");
            el.insertAdjacentHTML('beforeend',
                `<div class="flight-duration-stop"><span
   class="stop-item font_10">${abbr[1]}</span><span
   class="stop-tooltip transition">${document.getElementsByClassName("details-item")[i].querySelector(".endCityDetail").innerText}</span></div>`
            );
        }

    };
} else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 290) {
    for (var i = 0; i < document.querySelector(".departureRoutesInfo").getElementsByClassName("route-title").length; i++) {
        document.querySelector(".departureRoutesInfo").getElementsByClassName("route-title")[i].innerHTML = 'المغادرة'
    };
    for (var i = 0; i < document.querySelector(".returninfoRoutesInfo").getElementsByClassName("route-title").length; i++) {
        document.querySelector(".returninfoRoutesInfo").getElementsByClassName("route-title")[i].innerHTML = 'العوده'
    };
    let rout_dep_length = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item").length;
    let rout_des_length = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item").length;
    document.querySelector(".departureinfo").querySelector(".startTime").innerText = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[0].querySelector(".exitTime").innerText;
    document.querySelector(".departureinfo").querySelector(".endTime").innerText = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[rout_dep_length - 1].querySelector(".arrivalTime").innerText;
    document.querySelector(".returninfo").querySelector(".startTime").innerText = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[0].querySelector(".exitTime").innerText;
    document.querySelector(".returninfo").querySelector(".endTime").innerText = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[rout_des_length - 1].querySelector(".arrivalTime").innerText;
    if (rout_dep_length > 1) {
        var el = document.querySelector(".departureinfo").querySelector(".duration-line");
        for (var i = 0; i < rout_dep_length - 1; i++) {
            var abbr = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endAirportDetail")
                .innerText;
            abbr = abbr.split("/");
            el.insertAdjacentHTML('beforeend',
                `<div class="flight-duration-stop"><span
       class="stop-item font_10">${abbr[1]}</span><span
       class="stop-tooltip transition">${document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endCityDetail").innerText}</span></div>`
            );
        }

    };
    if (rout_des_length > 1) {
        var el = document.querySelector(".returninfo").querySelector(".duration-line");
        for (var i = 0; i < rout_des_length - 1; i++) {
            var abbr = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endAirportDetail")
                .innerText;
            abbr = abbr.split("/");
            el.insertAdjacentHTML('beforeend',
                `<div class="flight-duration-stop"><span
       class="stop-item font_10">${abbr[1]}</span><span
       class="stop-tooltip transition">${document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endCityDetail").innerText}</span></div>`
            );
        }

    };
} else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 292) {
    for (var i = 0; i < document.getElementsByClassName("flight-brief-info").length; i++) {
        for (var j = 0; j < document.getElementsByClassName("flight-brief-info")[i].getElementsByClassName("airline-item").length; j++) {
            let splited_element = document.getElementsByClassName("flight-brief-info")[i].getElementsByClassName("airline-item")[j].innerText.split("/")
            document.getElementsByClassName("flight-brief-info")[i].getElementsByClassName("airline-item")[j].innerText = '(' + splited_element[1] + ')';
            document.getElementsByClassName("flight-brief-info")[i].getElementsByClassName("airline-item")[j].classList.remove("unvisible");
        };

    };
    let flight_brief_length = document.getElementsByClassName("flight-brief-info").length;
    let rout_details_length = document.querySelector("#section-detail").getElementsByClassName("details-item").length;
    document.getElementsByClassName("flight-brief-info")[0].querySelector(".startTime").innerText = document.querySelector("#section-detail").getElementsByClassName("details-item")[0].querySelector(".exitTime").innerText;
    document.getElementsByClassName("flight-brief-info")[flight_brief_length - 1].querySelector(".endTime").innerText = document.querySelector("#section-detail").getElementsByClassName("details-item")[rout_details_length - 1].querySelector(".arrivalTime").innerText;
    if (flight_brief_length == 2) {
        if (rout_details_length == 2) {
            document.getElementsByClassName("flight-brief-info")[0].querySelector(".endTime").innerText = document.querySelector("#section-detail").getElementsByClassName("details-item")[0].querySelector(".arrivalTime").innerText;
            document.getElementsByClassName("flight-brief-info")[flight_brief_length - 1].querySelector(".startTime").innerText = document.querySelector("#section-detail").getElementsByClassName("details-item")[rout_details_length - 1].querySelector(".exitTime").innerText;
        } else {
            document.getElementsByClassName("flight-brief-info")[0].querySelector(".endTime").innerText = document.querySelector("#section-detail").getElementsByClassName("details-item")[1].querySelector(".arrivalTime").innerText;
            document.getElementsByClassName("flight-brief-info")[flight_brief_length - 1].querySelector(".startTime").innerText = document.querySelector("#section-detail").getElementsByClassName("details-item")[2].querySelector(".exitTime").innerText;

        }
    }
} else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 290251) {
    for (var i = 0; i < document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item").length; i++) {
        document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".route-title").innerHTML = 'المغادرة';
        document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endCityDetail").innerHTML = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".CityEnd").innerText;
        document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".startCityDetail").innerHTML = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".CityStart").innerText;
        document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".classNameDetail").innerHTML = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".ClassName").innerText;
        document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".routeCodeDetail").innerHTML = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".RouteCode").innerText;
    };
    for (var i = 0; i < document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item").length; i++) {
        document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".route-title").innerHTML = 'العوده';
        document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endCityDetail").innerHTML = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".CityEnd").innerText;
        document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".startCityDetail").innerHTML = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".CityStart").innerText;
        document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".classNameDetail").innerHTML = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".ClassName").innerText;
        document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".routeCodeDetail").innerHTML = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".RouteCode").innerText;
    };

    let rout_dep_length = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item").length;
    let rout_des_length = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item").length;
    document.querySelector(".departureinfo").querySelector(".startTime").innerText = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[0].querySelector(".exitTime").innerText;
    document.querySelector(".departureinfo").querySelector(".endTime").innerText = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[rout_dep_length - 1].querySelector(".arrivalTime").innerText;
    document.querySelector(".returninfo").querySelector(".startTime").innerText = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[0].querySelector(".exitTime").innerText;
    document.querySelector(".returninfo").querySelector(".endTime").innerText = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[rout_des_length - 1].querySelector(".arrivalTime").innerText;
    if (rout_dep_length > 1) {
        var el = document.querySelector(".departureinfo").querySelector(".duration-line");
        for (var i = 0; i < rout_dep_length - 1; i++) {
            var abbr = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endAirportDetail")
                .innerText;
            abbr = abbr.split("/");
            el.insertAdjacentHTML('beforeend',
                `<div class="flight-duration-stop"><span
       class="stop-item font_10">${abbr[1]}</span><span
       class="stop-tooltip transition">${document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endCityDetail").innerText}</span></div>`
            );
        }

    };
    if (rout_des_length > 1) {
        var el = document.querySelector(".returninfo").querySelector(".duration-line");
        for (var i = 0; i < rout_des_length - 1; i++) {
            var abbr = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endAirportDetail")
                .innerText;
            abbr = abbr.split("/");
            el.insertAdjacentHTML('beforeend',
                `<div class="flight-duration-stop"><span
       class="stop-item font_10">${abbr[1]}</span><span
       class="stop-tooltip transition">${document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endCityDetail").innerText}</span></div>`
            );
        }

    };
} else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 402) {
    for (var i = 0; i < document.querySelector(".departureRoutesInfo").getElementsByClassName("route-title").length; i++) {
        document.querySelector(".departureRoutesInfo").getElementsByClassName("route-title")[i].innerHTML = 'يدرب المغادرة'
    };
    for (var i = 0; i < document.querySelector(".returninfoRoutesInfo").getElementsByClassName("route-title").length; i++) {
        document.querySelector(".returninfoRoutesInfo").getElementsByClassName("route-title")[i].innerHTML = 'يدرب العوده'
    };
    let rout_dep_length = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item").length;
    let rout_des_length = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item").length;
    document.querySelector(".departureinfo").querySelector(".startTime").innerText = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[0].querySelector(".exitTime").innerText;
    document.querySelector(".departureinfo").querySelector(".endTime").innerText = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[rout_dep_length - 1].querySelector(".arrivalTime").innerText;
    document.querySelector(".returninfo").querySelector(".startTime").innerText = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[0].querySelector(".exitTime").innerText;
    document.querySelector(".returninfo").querySelector(".endTime").innerText = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[rout_des_length - 1].querySelector(".arrivalTime").innerText;
    if (rout_dep_length > 1) {
        var el = document.querySelector(".departureinfo").querySelector(".duration-line");
        for (var i = 0; i < rout_dep_length - 1; i++) {
            var abbr = document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endAirportDetail")
                .innerText;
            abbr = abbr.split("/");
            el.insertAdjacentHTML('beforeend',
                `<div class="flight-duration-stop"><span
       class="stop-item font_10">${abbr[1]}</span><span
       class="stop-tooltip transition">${document.querySelector(".departureRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endCityDetail").innerText}</span></div>`
            );
        }

    };
    if (rout_des_length > 1) {
        var el = document.querySelector(".returninfo").querySelector(".duration-line");
        for (var i = 0; i < rout_des_length - 1; i++) {
            var abbr = document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endAirportDetail")
                .innerText;
            abbr = abbr.split("/");
            el.insertAdjacentHTML('beforeend',
                `<div class="flight-duration-stop"><span
       class="stop-item font_10">${abbr[1]}</span><span
       class="stop-tooltip transition">${document.querySelector(".returninfoRoutesInfo").getElementsByClassName("details-item")[i].querySelector(".endCityDetail").innerText}</span></div>`
            );
        }

    };
    for (var i = 0; i < document.querySelector(".departureRoutesInfo").getElementsByClassName("start-route").length; i++) {
        document.querySelector(".departureRoutesInfo").getElementsByClassName("start-route")[i].innerHTML = document.getElementsByClassName("train-brief-info")[0].querySelector(".startCity").innerHTML;
    };
    for (var i = 0; i < document.querySelector(".departureRoutesInfo").getElementsByClassName("end-route").length; i++) {
        document.querySelector(".departureRoutesInfo").getElementsByClassName("end-route")[i].innerHTML = document.getElementsByClassName("train-brief-info")[0].querySelector(".endCity").innerHTML;
    };
    for (var i = 0; i < document.querySelector(".returninfoRoutesInfo").getElementsByClassName("start-route").length; i++) {
        document.querySelector(".returninfoRoutesInfo").getElementsByClassName("start-route")[i].innerHTML = document.getElementsByClassName("train-brief-info")[1].querySelector(".startCity").innerHTML;
    };
    for (var i = 0; i < document.querySelector(".returninfoRoutesInfo").getElementsByClassName("end-route").length; i++) {
        document.querySelector(".returninfoRoutesInfo").getElementsByClassName("end-route")[i].innerHTML = document.getElementsByClassName("train-brief-info")[1].querySelector(".endCity").innerHTML;

    };

}

//<!----------------END JS DETAILS---------------->
//<!----------------START JS GENERAL---------------->
for (var i = 0; i < document.getElementsByClassName('reSearch-form').length; i++) {
    if (document.getElementsByClassName('reSearch-form')[i].getAttribute("data-engine") == 1) {
        document.getElementsByClassName('reSearch-form')[i].setAttribute("action",
            `/${module}_engine__ar.bc`);
        if ($(window).width() <= 750) {
            document.getElementsByClassName('reSearch-form')[i].setAttribute("action",
                `/M_${module}_Engine_Search_ar.bc`);
        }
    } else {

        if ($(window).width() <= 750) {
            document.getElementsByClassName('reSearch-form')[i].setAttribute("action",
                `/M_${module}_Search_ar.bc`);
        }
        if (document.getElementsByClassName('reSearch-form')[i].getAttribute("data-tem") == '') {
            document.getElementsByClassName('reSearch-form')[i].setAttribute("action",
                `/tem3_${module}_search_AR.bc`);
        } else {
            document.getElementsByClassName('reSearch-form')[i].setAttribute("action", `/${document.getElementsByClassName('reSearch-form')[i].getAttribute("data-tem")}_${module}_Search_AR.bc`);
        }
    }

};

for (var i = 0; i < document.getElementsByClassName('unit-content').length; i++) {
    document.getElementsByClassName('unit-content')[i].innerText = document.querySelector(
        ".moneytype-value").getAttribute("data-output");

};
for (var i = 0; i < document.getElementsByClassName('separate').length; i++) {
    const Separated = new Intl.NumberFormat().format(document.getElementsByClassName('separate')[i]
        .innerText);
    document.getElementsByClassName('separate')[i].innerText = Separated;
};
$(document).on('click', function (event) {
    if (!$(event.target).closest('.has-select-input input,.has-select input,.has-select-input .drop-item,.has-select .drop-item').length) {
        //$(".drop-item").removeClass("drop-item-toggle");
        reset_drop_item();

    }
});

function onloadFunc(module) {
    if (typeof module !== 'undefined') {
        var counter = 1320;
    } else {
        var counter = 780;
    }
    setInterval(function () {
        counter--;
        var m = parseInt(counter / 60);
        var s = counter % 60;
        if (counter >= 0) {
            span = document.getElementById("timer");
            if (s < 10) {
                s = "0" + s;
            }
            if (m < 10) {
                m = "0" + m;
            }
            if (m < 2) {
                document.querySelector(".time-left").classList.add("blink_me")
            }
            span.innerHTML = "00:" + m + ":" + s;
        }
        if (counter === 0) {
            $(".message-box,#bg-popup").fadeIn();
            $(".message-box").css("top", "200px")
            clearInterval(counter);
        }
    }, 1000);

};

function toggle_details_content(element, type) {
    for (var i = 0; i < element.closest(".brief-container").getElementsByClassName('section-content').length; i++) {
        if (!element.closest(".brief-container").getElementsByClassName('section-content')[i].classList.contains("unvisible")) {
            element.closest(".brief-container").getElementsByClassName('section-content')[i].classList.toggle("unvisible");
        };
    };
    for (var i = 0; i < element.closest(".brief-container").getElementsByClassName('nav-li').length; i++) {
        if (element.closest(".brief-container").getElementsByClassName('nav-li')[i].classList.contains("active")) {
            element.closest(".brief-container").getElementsByClassName('nav-li')[i].classList.remove("active");
        };
    };
    element.classList.add('active');
    element.closest(".brief-container").querySelector(`#${type}`).classList.toggle('unvisible');
    if (type == 'section-rule') {
        if (element.getAttribute("data-type-description") == 'object') {
            document.querySelector(`#${type}`).querySelector(".text-dep").classList.remove("max-height");
            document.querySelector(`#${type}`).querySelector(".text-dep").innerHTML = `<p class="title">لمعرفة قوانين الحقائب للمغادرة<span class="clicked font-weight cursor-pointer"  onclick="show_flight_rule(this,'dep')">اضغط هنا</span></p><p dir="auto" class="response"></p>`;
            if (document.querySelector(`#${type}`).querySelector(".text-des")) {
                document.querySelector(`#${type}`).querySelector(".text-des").classList.remove("max-height");
                document.querySelector(`#${type}`).querySelector(".text-des").innerHTML = `<p class="title">لمعرفة قوانين الحقائب للعودة <span class="clicked font-weight cursor-pointer"  onclick="show_flight_rule(this,'des')">اضغط هنا</span></p><p dir="auto" class="response"></p>`;
            }
        }

    } else if (type == 'section-bar') {
        if (element.getAttribute("data-type-description") == 'object') {
            document.querySelector(`#${type}`).querySelector(".text-dep").classList.remove("max-height");
            document.querySelector(`#${type}`).querySelector(".text-dep").innerHTML = `<p class="title">لمعرفة قوانين الحقائب للمغادرة<span class="clicked font-weight cursor-pointer"  onclick="show_flight_bar(this,'dep')">اضغط هنا</span></p><p dir="auto" class="response"></p>`;
            if (document.querySelector(`#${type}`).querySelector(".text-des")) {
                document.querySelector(`#${type}`).querySelector(".text-des").classList.remove("max-height");
                document.querySelector(`#${type}`).querySelector(".text-des").innerHTML = `<p class="title">لمعرفة قوانين الحقائب للعودة <span class="clicked font-weight cursor-pointer"  onclick="show_flight_bar(this,'des')">اضغط هنا</span></p><p dir="auto" class="response"></p>`;
            }
        }

    } else if (type == 'section-price') {
        for (var i = 0; i < document.querySelector(`#${type}`).getElementsByClassName('body-content').length; i++) {
            if (document.querySelector(`#${type}`).getElementsByClassName('body-content')[i].querySelector(".count").innerText == 0) {
                document.querySelector(`#${type}`).getElementsByClassName('body-content')[i].style.display = "none";
                if (document.querySelector(`#${type}`).getElementsByClassName('body-content')[i].closest(".prices-detail-content").classList.contains("darbast")) {
                    document.querySelector(`#${type}`).getElementsByClassName('body-content')[i].closest(".prices-detail-content").style.display = "none";
                }
            }
        };
    }

};

function show_flight_bar(element, type) {
    element.closest(".section-item").querySelector(".loading-container").classList.remove("unvisible");
    let obj_stringify = document.querySelector("#section-bar").getAttribute(`data-description-${type}`);
    obj_stringify = obj_stringify.replace(/\\/g, '');
    $.post(`/Client_Baggage_Rule.bc`, {
        id: obj_stringify
    }, function (response) {
        element.closest(".section-item").querySelector(".loading-container").classList.add("unvisible");
        $(element).closest(".section-item").find(".response").addClass("max-height").html(response);

    });

};

function show_flight_rule(element) {
    element.closest(".section-item").querySelector(".loading-container").classList.remove("unvisible");
    const obj = new Object();
    obj["id"] = JSON.parse(document.querySelector(".invoice-form").querySelector("input[name=idws]").value);
    obj["adults"] = parseFloat(document.querySelector(".invoice-form").querySelector("input[name=adultcount]").value);
    obj["childs"] = parseFloat(document.querySelector(".invoice-form").querySelector("input[name=childcount]").value);
    obj["infant"] = parseFloat(document.querySelector(".invoice-form").querySelector("input[name=infantcount]").value);
    delete obj["bar_info"];
    let obj_stringify = JSON.stringify(obj);
    obj_stringify = obj_stringify.replace(/\\/g, '');
    $.post(`/Client_Flight_Rule.bc`, {
        id: obj_stringify
    }, function (response) {
        element.closest(".section-item").querySelector(".loading-container").classList.add("unvisible");
        $(element).closest(".section-item").find(".response").addClass("max-height").html(response);

    });
};

function check_invoice(element, type) {
    if (element.closest(".invoice-container").querySelector(".dot-waiting")) {
        element.closest(".invoice-container").querySelector(".dot-waiting").remove();
    };
    if (type == 'preInvoice') {
        element.closest(".invoice-container").querySelector(".invoice-content").insertAdjacentHTML('beforeend',
            `<div class="dot-waiting">إصدار العقد المسبق، يرجى الإنتظار</div>`);
        element.closest(".invoice-container").querySelector(".invoice-content").classList.add("not-active");
        document.querySelector("input[name=bank_id]").value = -1;
        if (element.getAttribute("data-clicked") == 0) {
            element.setAttribute("data-clicked", "1");
            document.querySelector(".invoice-form").submit();
        }

    } else {
        if (element.getAttribute("data-clicked") == 0) {
            for (var i = 0; i < element.closest(".invoice-container").getElementsByClassName('invoice-content').length; i++) {
                element.closest(".invoice-container").getElementsByClassName('invoice-content')[i].setAttribute("data-clicked", "1");
                element.closest(".invoice-container").getElementsByClassName('invoice-content')[i].classList.add("not-active");
            };
            if (type == 'bankInvoice') {
                document.querySelector("input[name=paytype]").value = "bank";
                document.querySelector("input[name=clear]").value = 0;
                document.querySelector("input[name=bank_id]").value = element.querySelector(".bankwid").value;
                if (element.querySelector(".bankwid").value == -1) {
                    element.closest(".invoice-container").insertAdjacentHTML('beforeend',
                        `<div class="dot-waiting">إصدار العقد المسبق، يرجى الإنتظار</div>`);
                    document.querySelector(".invoice-form").submit();
                } else if (element.querySelector(".bankwid").value == 97) {
                    element.setAttribute("data-clicked", "0");
                    element.classList.remove("not-active");
                    element.closest(".invoice-container").insertAdjacentHTML('beforeend',
                        `<div class="get-bank-info-container get-bank-info-container-toggle">
                        <div class="bg-get-bank-info-container"></div>
                        <div class="main-get-bank-info-container">
                        <div class="get-bank-info-closed"><i class="fa fa-times" onclick="close_bank_info(this)"></i></div>
                            <p class="font_14">عزيزي المستخدم، لاستخدام بوابة Sibank، يرجى إدخال هاتفك المحمول والرمز الوطني.</p>
                            <p class="font_13 get-bank-warning"> تجدر الإشارة إلى أن الهاتف المحمول الذي تم إدخاله يجب أن ينتمي إلى الرمز الوطني المذكور
                            </p>
                            <div class="package-info-item">
                                <label> الهاتف الخلوي</label>
                                <div class="package-number-items">
                                    <div class="inner-item"><input type="text" class="mobileSiBank siBank-info"
                                            onkeyup="this.value=this.value.replace(/[^0-9]/g, '');"></div>
                                </div>
                            </div>
                            <div class="package-info-item">
                                <label> رقم الهویة الوطنية</label>
                                <div class="package-number-items">
                                    <div class="inner-item"><input type="text" class="nationalCodeSiBank siBank-info"
                                            onkeyup="this.value=this.value.replace(/[^0-9]/g, '');"></div>
                                </div>
                            </div>
                            <button type="button" class="btn-item next-btn" onclick="siBank_isSubmited(this,element)">سجل وأرسل</button>
                        </div>
                    </div>`);
                }
                else {
                    element.closest(".invoice-container").insertAdjacentHTML('beforeend',
                        `<div class="dot-waiting">جارٍ الاتصال بمنفذ البنك، يرجى الانتظار</div>`);
                    document.querySelector(".invoice-form").submit();

                }
            } else if (type == 'creditInvoice') {
                document.querySelector("input[name=paytype]").value = "credit";
                document.querySelector("input[name=clear]").value = 6;
                element.closest(".invoice-container").insertAdjacentHTML('beforeend',
                    `<div class="dot-waiting">جاري إصدار العقد، الرجاء الإنتظار</div>`);
                document.querySelector(".invoice-form").submit();
            }

        }
    }

};
function close_bank_info(element) {
    element.closest(".get-bank-info-container").classList.remove("get-bank-info-container-toggle");
};

function siBank_isSubmited(element, item) {
    var isExist = true;
    element.closest(".get-bank-info-container").querySelectorAll(".siBank-info").forEach((e) => {
        if (e.value == "") {
            isExist = false;
            e.closest(".inner-item").classList.add("invalid");
        } else {
            e.closest(".inner-item").classList.remove("invalid");
        }
    });
    if (isExist) {
        document.querySelector(".invoice-form").insertAdjacentHTML('beforeend', `<input type="hidden" value="${element.closest(".get-bank-info-container").querySelector(".mobileSiBank").value}" name="mobileSiBank"/><input type="hidden" value="${element.closest(".get-bank-info-container").querySelector(".nationalCodeSiBank").value}" name="nationalCodeSiBank"/>`)
        element.closest(".invoice-container").querySelector(".get-bank-info-container").classList.remove("get-bank-info-container-toggle");
        element.closest(".invoice-container").insertAdjacentHTML('beforeend',
            `<div class="dot-waiting">جارٍ الاتصال بمنفذ البنك، يرجى الانتظار</div>`);
        document.querySelector(".invoice-form").submit();
        item.setAttribute("data-clicked", "0");
        item.classList.remove("not-active");
    }

}



function check_steps(element) {
    for (var i = 0; i < document.getElementsByClassName('step-item').length; i++) {
        if (document.getElementsByClassName('step-item')[i].getAttribute("data-step") == element) {
            if (element == 'service') {
                document.getElementsByClassName('step-item')[i].classList.remove("step-item-unvisible");
            }
            document.getElementsByClassName('step-item')[i].classList.add("active");
        } else {
            document.getElementsByClassName('step-item')[i].classList.remove("active");
        }
    };

};
check_price('', '', '', '');

function check_price(commission, totalcom, firstpay, Credit_payment) {
    if (commission !== '') {
        document.querySelector(".commission-section").setAttribute("data-output", commission);
        document.querySelector(".totalcom-section").setAttribute("data-output", totalcom);
        document.querySelector(".firstpay-section").setAttribute("data-output", firstpay);
        document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerHTML = new Intl.NumberFormat().format(firstpay);
        if (document.querySelector(".Credit_payment")) {
            document.querySelector(".Credit_payment").value = Credit_payment;
        } else {
            document.querySelector(".invoice-form").insertAdjacentHTML('beforeend', `<input type="hidden" value="${Credit_payment}" class="Credit_payment"/>`);
        }

    };


    if (document.querySelector(".commission-section").getAttribute("data-output") != 0) {
        document.querySelector(".commission-section").style.display = "flex";
        document.querySelector(".commission-section").querySelector(".commission-price").innerText = new Intl.NumberFormat().format(document.querySelector(".commission-section").getAttribute("data-output"));
        document.querySelector(".total-section").insertAdjacentHTML('beforeend', `<div class="font_14 title">المبلغ الأولي</div><div>
                                           <span class="font-weight font_13 total-price">${new Intl.NumberFormat().format(document.querySelector(".total-section").getAttribute("data-output"))}</span> 
                                           <span class="unit-content">${document.querySelector(".moneytype-value").getAttribute("data-output")}</span></div>
                                   `);
    }
    if (document.querySelector(".firstpay-section").getAttribute("data-output") !== document.querySelector(".totalcom-section").getAttribute("data-output")) {
        document.querySelector(".totalcom-section").insertAdjacentHTML('beforeend', `<div class="font_14 title">المبلغ المستحق</div><div>
                                           <span class="font-weight font_17 totalcom-price" data-value="${new Intl.NumberFormat().format(document.querySelector(".totalcom-section").getAttribute("data-output"))}">${new Intl.NumberFormat().format(document.querySelector(".totalcom-section").getAttribute("data-output"))}</span> 
                                           <span class="unit-content">${document.querySelector(".moneytype-value").getAttribute("data-output")}</span></div>
                                   `);
        document.querySelector(".firstpay-section").querySelector(".title").innerHTML = "الدفع بالمرحلة الأولى";

    };
    for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".extra_service_id_value_final")) {
            check_extra_service_price(sum_extra_service);
            return false;
        }
    };
    currency_rate()
};
//<!----------------END JS GENERAL---------------->
//<!----------------START JS PASSENGER---------------->
const schema = JSON.parse(document.querySelector(".passenger-form-value").getAttribute("data-output"));
const data_day = new Array();
const data_month = new Array();
const data_year_birthdate = new Array();
const data_year_passport = new Array();
const data_area = new Array();
const data_year_service = new Array();
const data_year_visa = new Array();
const data_countryCode = [{
    "name": "Afghanistan",
    "dial_code": "+93",
    "code": "AF"
},
{
    "name": "Aland Islands",
    "dial_code": "+358",
    "code": "AX"
},
{
    "name": "Albania",
    "dial_code": "+355",
    "code": "AL"
},
{
    "name": "Algeria",
    "dial_code": "+213",
    "code": "DZ"
},
{
    "name": "AmericanSamoa",
    "dial_code": "+1684",
    "code": "AS"
},
{
    "name": "Andorra",
    "dial_code": "+376",
    "code": "AD"
},
{
    "name": "Angola",
    "dial_code": "+244",
    "code": "AO"
},
{
    "name": "Anguilla",
    "dial_code": "+1264",
    "code": "AI"
},
{
    "name": "Antarctica",
    "dial_code": "+672",
    "code": "AQ"
},
{
    "name": "Antigua and Barbuda",
    "dial_code": "+1268",
    "code": "AG"
},
{
    "name": "Argentina",
    "dial_code": "+54",
    "code": "AR"
},
{
    "name": "Armenia",
    "dial_code": "+374",
    "code": "AM"
},
{
    "name": "Aruba",
    "dial_code": "+297",
    "code": "AW"
},
{
    "name": "Australia",
    "dial_code": "+61",
    "code": "AU"
},
{
    "name": "Austria",
    "dial_code": "+43",
    "code": "AT"
},
{
    "name": "Azerbaijan",
    "dial_code": "+994",
    "code": "AZ"
},
{
    "name": "Bahamas",
    "dial_code": "+1242",
    "code": "BS"
},
{
    "name": "Bahrain",
    "dial_code": "+973",
    "code": "BH"
},
{
    "name": "Bangladesh",
    "dial_code": "+880",
    "code": "BD"
},
{
    "name": "Barbados",
    "dial_code": "+1246",
    "code": "BB"
},
{
    "name": "Belarus",
    "dial_code": "+375",
    "code": "BY"
},
{
    "name": "Belgium",
    "dial_code": "+32",
    "code": "BE"
},
{
    "name": "Belize",
    "dial_code": "+501",
    "code": "BZ"
},
{
    "name": "Benin",
    "dial_code": "+229",
    "code": "BJ"
},
{
    "name": "Bermuda",
    "dial_code": "+1441",
    "code": "BM"
},
{
    "name": "Bhutan",
    "dial_code": "+975",
    "code": "BT"
},
{
    "name": "Bolivia, Plurinational State of",
    "dial_code": "+591",
    "code": "BO"
},
{
    "name": "Bosnia and Herzegovina",
    "dial_code": "+387",
    "code": "BA"
},
{
    "name": "Botswana",
    "dial_code": "+267",
    "code": "BW"
},
{
    "name": "Brazil",
    "dial_code": "+55",
    "code": "BR"
},
{
    "name": "British Indian Ocean Territory",
    "dial_code": "+246",
    "code": "IO"
},
{
    "name": "Brunei Darussalam",
    "dial_code": "+673",
    "code": "BN"
},
{
    "name": "Bulgaria",
    "dial_code": "+359",
    "code": "BG"
},
{
    "name": "Burkina Faso",
    "dial_code": "+226",
    "code": "BF"
},
{
    "name": "Burundi",
    "dial_code": "+257",
    "code": "BI"
},
{
    "name": "Cambodia",
    "dial_code": "+855",
    "code": "KH"
},
{
    "name": "Cameroon",
    "dial_code": "+237",
    "code": "CM"
},
{
    "name": "Canada",
    "dial_code": "+1",
    "code": "CA"
},
{
    "name": "Cape Verde",
    "dial_code": "+238",
    "code": "CV"
},
{
    "name": "Cayman Islands",
    "dial_code": "+ 345",
    "code": "KY"
},
{
    "name": "Central African Republic",
    "dial_code": "+236",
    "code": "CF"
},
{
    "name": "Chad",
    "dial_code": "+235",
    "code": "TD"
},
{
    "name": "Chile",
    "dial_code": "+56",
    "code": "CL"
},
{
    "name": "China",
    "dial_code": "+86",
    "code": "CN"
},
{
    "name": "Christmas Island",
    "dial_code": "+61",
    "code": "CX"
},
{
    "name": "Cocos (Keeling) Islands",
    "dial_code": "+61",
    "code": "CC"
},
{
    "name": "Colombia",
    "dial_code": "+57",
    "code": "CO"
},
{
    "name": "Comoros",
    "dial_code": "+269",
    "code": "KM"
},
{
    "name": "Congo",
    "dial_code": "+242",
    "code": "CG"
},
{
    "name": "Congo, The Democratic Republic of the Congo",
    "dial_code": "+243",
    "code": "CD"
},
{
    "name": "Cook Islands",
    "dial_code": "+682",
    "code": "CK"
},
{
    "name": "Costa Rica",
    "dial_code": "+506",
    "code": "CR"
},
{
    "name": "Cote d'Ivoire",
    "dial_code": "+225",
    "code": "CI"
},
{
    "name": "Croatia",
    "dial_code": "+385",
    "code": "HR"
},
{
    "name": "Cuba",
    "dial_code": "+53",
    "code": "CU"
},
{
    "name": "Cyprus",
    "dial_code": "+357",
    "code": "CY"
},
{
    "name": "Czech Republic",
    "dial_code": "+420",
    "code": "CZ"
},
{
    "name": "Denmark",
    "dial_code": "+45",
    "code": "DK"
},
{
    "name": "Djibouti",
    "dial_code": "+253",
    "code": "DJ"
},
{
    "name": "Dominica",
    "dial_code": "+1767",
    "code": "DM"
},
{
    "name": "Dominican Republic",
    "dial_code": "+1849",
    "code": "DO"
},
{
    "name": "Ecuador",
    "dial_code": "+593",
    "code": "EC"
},
{
    "name": "Egypt",
    "dial_code": "+20",
    "code": "EG"
},
{
    "name": "El Salvador",
    "dial_code": "+503",
    "code": "SV"
},
{
    "name": "Equatorial Guinea",
    "dial_code": "+240",
    "code": "GQ"
},
{
    "name": "Eritrea",
    "dial_code": "+291",
    "code": "ER"
},
{
    "name": "Estonia",
    "dial_code": "+372",
    "code": "EE"
},
{
    "name": "Ethiopia",
    "dial_code": "+251",
    "code": "ET"
},
{
    "name": "Falkland Islands (Malvinas)",
    "dial_code": "+500",
    "code": "FK"
},
{
    "name": "Faroe Islands",
    "dial_code": "+298",
    "code": "FO"
},
{
    "name": "Fiji",
    "dial_code": "+679",
    "code": "FJ"
},
{
    "name": "Finland",
    "dial_code": "+358",
    "code": "FI"
},
{
    "name": "France",
    "dial_code": "+33",
    "code": "FR"
},
{
    "name": "French Guiana",
    "dial_code": "+594",
    "code": "GF"
},
{
    "name": "French Polynesia",
    "dial_code": "+689",
    "code": "PF"
},
{
    "name": "Gabon",
    "dial_code": "+241",
    "code": "GA"
},
{
    "name": "Gambia",
    "dial_code": "+220",
    "code": "GM"
},
{
    "name": "Georgia",
    "dial_code": "+995",
    "code": "GE"
},
{
    "name": "Germany",
    "dial_code": "+49",
    "code": "DE"
},
{
    "name": "Ghana",
    "dial_code": "+233",
    "code": "GH"
},
{
    "name": "Gibraltar",
    "dial_code": "+350",
    "code": "GI"
},
{
    "name": "Greece",
    "dial_code": "+30",
    "code": "GR"
},
{
    "name": "Greenland",
    "dial_code": "+299",
    "code": "GL"
},
{
    "name": "Grenada",
    "dial_code": "+1473",
    "code": "GD"
},
{
    "name": "Guadeloupe",
    "dial_code": "+590",
    "code": "GP"
},
{
    "name": "Guam",
    "dial_code": "+1671",
    "code": "GU"
},
{
    "name": "Guatemala",
    "dial_code": "+502",
    "code": "GT"
},
{
    "name": "Guernsey",
    "dial_code": "+44",
    "code": "GG"
},
{
    "name": "Guinea",
    "dial_code": "+224",
    "code": "GN"
},
{
    "name": "Guinea-Bissau",
    "dial_code": "+245",
    "code": "GW"
},
{
    "name": "Guyana",
    "dial_code": "+595",
    "code": "GY"
},
{
    "name": "Haiti",
    "dial_code": "+509",
    "code": "HT"
},
{
    "name": "Holy See (Vatican City State)",
    "dial_code": "+379",
    "code": "VA"
},
{
    "name": "Honduras",
    "dial_code": "+504",
    "code": "HN"
},
{
    "name": "Hong Kong",
    "dial_code": "+852",
    "code": "HK"
},
{
    "name": "Hungary",
    "dial_code": "+36",
    "code": "HU"
},
{
    "name": "Iceland",
    "dial_code": "+354",
    "code": "IS"
},
{
    "name": "India",
    "dial_code": "+91",
    "code": "IN"
},
{
    "name": "Indonesia",
    "dial_code": "+62",
    "code": "ID"
},
{
    "name": "Iran",
    "dial_code": "+98",
    "code": "IR"
},
{
    "name": "Iraq",
    "dial_code": "+964",
    "code": "IQ"
},
{
    "name": "Ireland",
    "dial_code": "+353",
    "code": "IE"
},
{
    "name": "Isle of Man",
    "dial_code": "+44",
    "code": "IM"
},
{
    "name": "Israel",
    "dial_code": "+972",
    "code": "IL"
},
{
    "name": "Italy",
    "dial_code": "+39",
    "code": "IT"
},
{
    "name": "Jamaica",
    "dial_code": "+1876",
    "code": "JM"
},
{
    "name": "Japan",
    "dial_code": "+81",
    "code": "JP"
},
{
    "name": "Jersey",
    "dial_code": "+44",
    "code": "JE"
},
{
    "name": "Jordan",
    "dial_code": "+962",
    "code": "JO"
},
{
    "name": "Kazakhstan",
    "dial_code": "+77",
    "code": "KZ"
},
{
    "name": "Kenya",
    "dial_code": "+254",
    "code": "KE"
},
{
    "name": "Kiribati",
    "dial_code": "+686",
    "code": "KI"
},
{
    "name": "Korea, Democratic People's Republic of Korea",
    "dial_code": "+850",
    "code": "KP"
},
{
    "name": "Korea, Republic of South Korea",
    "dial_code": "+82",
    "code": "KR"
},
{
    "name": "Kuwait",
    "dial_code": "+965",
    "code": "KW"
},
{
    "name": "Kyrgyzstan",
    "dial_code": "+996",
    "code": "KG"
},
{
    "name": "Laos",
    "dial_code": "+856",
    "code": "LA"
},
{
    "name": "Latvia",
    "dial_code": "+371",
    "code": "LV"
},
{
    "name": "Lebanon",
    "dial_code": "+961",
    "code": "LB"
},
{
    "name": "Lesotho",
    "dial_code": "+266",
    "code": "LS"
},
{
    "name": "Liberia",
    "dial_code": "+231",
    "code": "LR"
},
{
    "name": "Libyan Arab Jamahiriya",
    "dial_code": "+218",
    "code": "LY"
},
{
    "name": "Liechtenstein",
    "dial_code": "+423",
    "code": "LI"
},
{
    "name": "Lithuania",
    "dial_code": "+370",
    "code": "LT"
},
{
    "name": "Luxembourg",
    "dial_code": "+352",
    "code": "LU"
},
{
    "name": "Macao",
    "dial_code": "+853",
    "code": "MO"
},
{
    "name": "Macedonia",
    "dial_code": "+389",
    "code": "MK"
},
{
    "name": "Madagascar",
    "dial_code": "+261",
    "code": "MG"
},
{
    "name": "Malawi",
    "dial_code": "+265",
    "code": "MW"
},
{
    "name": "Malaysia",
    "dial_code": "+60",
    "code": "MY"
},
{
    "name": "Maldives",
    "dial_code": "+960",
    "code": "MV"
},
{
    "name": "Mali",
    "dial_code": "+223",
    "code": "ML"
},
{
    "name": "Malta",
    "dial_code": "+356",
    "code": "MT"
},
{
    "name": "Marshall Islands",
    "dial_code": "+692",
    "code": "MH"
},
{
    "name": "Martinique",
    "dial_code": "+596",
    "code": "MQ"
},
{
    "name": "Mauritania",
    "dial_code": "+222",
    "code": "MR"
},
{
    "name": "Mauritius",
    "dial_code": "+230",
    "code": "MU"
},
{
    "name": "Mayotte",
    "dial_code": "+262",
    "code": "YT"
},
{
    "name": "Mexico",
    "dial_code": "+52",
    "code": "MX"
},
{
    "name": "Micronesia, Federated States of Micronesia",
    "dial_code": "+691",
    "code": "FM"
},
{
    "name": "Moldova",
    "dial_code": "+373",
    "code": "MD"
},
{
    "name": "Monaco",
    "dial_code": "+377",
    "code": "MC"
},
{
    "name": "Mongolia",
    "dial_code": "+976",
    "code": "MN"
},
{
    "name": "Montenegro",
    "dial_code": "+382",
    "code": "ME"
},
{
    "name": "Montserrat",
    "dial_code": "+1664",
    "code": "MS"
},
{
    "name": "Morocco",
    "dial_code": "+212",
    "code": "MA"
},
{
    "name": "Mozambique",
    "dial_code": "+258",
    "code": "MZ"
},
{
    "name": "Myanmar",
    "dial_code": "+95",
    "code": "MM"
},
{
    "name": "Namibia",
    "dial_code": "+264",
    "code": "NA"
},
{
    "name": "Nauru",
    "dial_code": "+674",
    "code": "NR"
},
{
    "name": "Nepal",
    "dial_code": "+977",
    "code": "NP"
},
{
    "name": "Netherlands",
    "dial_code": "+31",
    "code": "NL"
},
{
    "name": "Netherlands Antilles",
    "dial_code": "+599",
    "code": "AN"
},
{
    "name": "New Caledonia",
    "dial_code": "+687",
    "code": "NC"
},
{
    "name": "New Zealand",
    "dial_code": "+64",
    "code": "NZ"
},
{
    "name": "Nicaragua",
    "dial_code": "+505",
    "code": "NI"
},
{
    "name": "Niger",
    "dial_code": "+227",
    "code": "NE"
},
{
    "name": "Nigeria",
    "dial_code": "+234",
    "code": "NG"
},
{
    "name": "Niue",
    "dial_code": "+683",
    "code": "NU"
},
{
    "name": "Norfolk Island",
    "dial_code": "+672",
    "code": "NF"
},
{
    "name": "Northern Mariana Islands",
    "dial_code": "+1670",
    "code": "MP"
},
{
    "name": "Norway",
    "dial_code": "+47",
    "code": "NO"
},
{
    "name": "Oman",
    "dial_code": "+968",
    "code": "OM"
},
{
    "name": "Pakistan",
    "dial_code": "+92",
    "code": "PK"
},
{
    "name": "Palau",
    "dial_code": "+680",
    "code": "PW"
},
{
    "name": "Palestinian Territory, Occupied",
    "dial_code": "+970",
    "code": "PS"
},
{
    "name": "Panama",
    "dial_code": "+507",
    "code": "PA"
},
{
    "name": "Papua New Guinea",
    "dial_code": "+675",
    "code": "PG"
},
{
    "name": "Paraguay",
    "dial_code": "+595",
    "code": "PY"
},
{
    "name": "Peru",
    "dial_code": "+51",
    "code": "PE"
},
{
    "name": "Philippines",
    "dial_code": "+63",
    "code": "PH"
},
{
    "name": "Pitcairn",
    "dial_code": "+872",
    "code": "PN"
},
{
    "name": "Poland",
    "dial_code": "+48",
    "code": "PL"
},
{
    "name": "Portugal",
    "dial_code": "+351",
    "code": "PT"
},
{
    "name": "Puerto Rico",
    "dial_code": "+1939",
    "code": "PR"
},
{
    "name": "Qatar",
    "dial_code": "+974",
    "code": "QA"
},
{
    "name": "Romania",
    "dial_code": "+40",
    "code": "RO"
},
{
    "name": "Russia",
    "dial_code": "+7",
    "code": "RU"
},
{
    "name": "Rwanda",
    "dial_code": "+250",
    "code": "RW"
},
{
    "name": "Reunion",
    "dial_code": "+262",
    "code": "RE"
},
{
    "name": "Saint Barthelemy",
    "dial_code": "+590",
    "code": "BL"
},
{
    "name": "Saint Helena, Ascension and Tristan Da Cunha",
    "dial_code": "+290",
    "code": "SH"
},
{
    "name": "Saint Kitts and Nevis",
    "dial_code": "+1869",
    "code": "KN"
},
{
    "name": "Saint Lucia",
    "dial_code": "+1758",
    "code": "LC"
},
{
    "name": "Saint Martin",
    "dial_code": "+590",
    "code": "MF"
},
{
    "name": "Saint Pierre and Miquelon",
    "dial_code": "+508",
    "code": "PM"
},
{
    "name": "Saint Vincent and the Grenadines",
    "dial_code": "+1784",
    "code": "VC"
},
{
    "name": "Samoa",
    "dial_code": "+685",
    "code": "WS"
},
{
    "name": "San Marino",
    "dial_code": "+378",
    "code": "SM"
},
{
    "name": "Sao Tome and Principe",
    "dial_code": "+239",
    "code": "ST"
},
{
    "name": "Saudi Arabia",
    "dial_code": "+966",
    "code": "SA"
},
{
    "name": "Senegal",
    "dial_code": "+221",
    "code": "SN"
},
{
    "name": "Serbia",
    "dial_code": "+381",
    "code": "RS"
},
{
    "name": "Seychelles",
    "dial_code": "+248",
    "code": "SC"
},
{
    "name": "Sierra Leone",
    "dial_code": "+232",
    "code": "SL"
},
{
    "name": "Singapore",
    "dial_code": "+65",
    "code": "SG"
},
{
    "name": "Slovakia",
    "dial_code": "+421",
    "code": "SK"
},
{
    "name": "Slovenia",
    "dial_code": "+386",
    "code": "SI"
},
{
    "name": "Solomon Islands",
    "dial_code": "+677",
    "code": "SB"
},
{
    "name": "Somalia",
    "dial_code": "+252",
    "code": "SO"
},
{
    "name": "South Africa",
    "dial_code": "+27",
    "code": "ZA"
},
{
    "name": "South Sudan",
    "dial_code": "+211",
    "code": "SS"
},
{
    "name": "South Georgia and the South Sandwich Islands",
    "dial_code": "+500",
    "code": "GS"
},
{
    "name": "Spain",
    "dial_code": "+34",
    "code": "ES"
},
{
    "name": "Sri Lanka",
    "dial_code": "+94",
    "code": "LK"
},
{
    "name": "Sudan",
    "dial_code": "+249",
    "code": "SD"
},
{
    "name": "Suriname",
    "dial_code": "+597",
    "code": "SR"
},
{
    "name": "Svalbard and Jan Mayen",
    "dial_code": "+47",
    "code": "SJ"
},
{
    "name": "Swaziland",
    "dial_code": "+268",
    "code": "SZ"
},
{
    "name": "Sweden",
    "dial_code": "+46",
    "code": "SE"
},
{
    "name": "Switzerland",
    "dial_code": "+41",
    "code": "CH"
},
{
    "name": "Syrian Arab Republic",
    "dial_code": "+963",
    "code": "SY"
},
{
    "name": "Taiwan",
    "dial_code": "+886",
    "code": "TW"
},
{
    "name": "Tajikistan",
    "dial_code": "+992",
    "code": "TJ"
},
{
    "name": "Tanzania, United Republic of Tanzania",
    "dial_code": "+255",
    "code": "TZ"
},
{
    "name": "Thailand",
    "dial_code": "+66",
    "code": "TH"
},
{
    "name": "Timor-Leste",
    "dial_code": "+670",
    "code": "TL"
},
{
    "name": "Togo",
    "dial_code": "+228",
    "code": "TG"
},
{
    "name": "Tokelau",
    "dial_code": "+690",
    "code": "TK"
},
{
    "name": "Tonga",
    "dial_code": "+676",
    "code": "TO"
},
{
    "name": "Trinidad and Tobago",
    "dial_code": "+1868",
    "code": "TT"
},
{
    "name": "Tunisia",
    "dial_code": "+216",
    "code": "TN"
},
{
    "name": "Turkey",
    "dial_code": "+90",
    "code": "TR"
},
{
    "name": "Turkmenistan",
    "dial_code": "+993",
    "code": "TM"
},
{
    "name": "Turks and Caicos Islands",
    "dial_code": "+1649",
    "code": "TC"
},
{
    "name": "Tuvalu",
    "dial_code": "+688",
    "code": "TV"
},
{
    "name": "Uganda",
    "dial_code": "+256",
    "code": "UG"
},
{
    "name": "Ukraine",
    "dial_code": "+380",
    "code": "UA"
},
{
    "name": "United Arab Emirates",
    "dial_code": "+971",
    "code": "AE"
},
{
    "name": "United Kingdom",
    "dial_code": "+44",
    "code": "GB"
},
{
    "name": "United States",
    "dial_code": "+1",
    "code": "US"
},
{
    "name": "Uruguay",
    "dial_code": "+598",
    "code": "UY"
},
{
    "name": "Uzbekistan",
    "dial_code": "+998",
    "code": "UZ"
},
{
    "name": "Vanuatu",
    "dial_code": "+678",
    "code": "VU"
},
{
    "name": "Venezuela, Bolivarian Republic of Venezuela",
    "dial_code": "+58",
    "code": "VE"
},
{
    "name": "Vietnam",
    "dial_code": "+84",
    "code": "VN"
},
{
    "name": "Virgin Islands, British",
    "dial_code": "+1284",
    "code": "VG"
},
{
    "name": "Virgin Islands, U.S.",
    "dial_code": "+1340",
    "code": "VI"
},
{
    "name": "Wallis and Futuna",
    "dial_code": "+681",
    "code": "WF"
},
{
    "name": "Yemen",
    "dial_code": "+967",
    "code": "YE"
},
{
    "name": "Zambia",
    "dial_code": "+260",
    "code": "ZM"
},
{
    "name": "Zimbabwe",
    "dial_code": "+263",
    "code": "ZW"
}
];
if (document.querySelector(".cips-info-content")) {
    renderData(data_countryCode, "code", "default");
};
if (document.querySelector(".main-container").getAttribute("data-schemaid") == 290 || document.querySelector(".main-container").getAttribute("data-schemaid") == 291 || document.querySelector(".main-container").getAttribute("data-schemaid") == 292 || document.querySelector(".main-container").getAttribute("data-schemaid") == 139 || document.querySelector(".main-container").getAttribute("data-schemaid") == 500 || document.querySelector(".main-container").getAttribute("data-schemaid") == 401 || document.querySelector(".main-container").getAttribute("data-schemaid") == 402 || document.querySelector(".main-container").getAttribute("data-schemaid") == 501) {
    var insurance_birthday = "";
    if (document.querySelector(".reSearch-form").querySelector("input[name=birthday]")) {
        insurance_birthday = document.querySelector(".reSearch-form").querySelector("input[name=birthday]").value;
        insurance_birthday = insurance_birthday.split(",");
        insurance_birthday = insurance_birthday.sort(function (a, b) {
            var aa = a.split('-').join(),
                bb = b.split('-').join();
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });

    };
    for (var i = 0; i < schema.length; i++) {
        var internal = "external";
        if (document.querySelector(".internal").value == 1 || document.querySelector(".internal").value == 1002236) {
            internal = "internal"
        }
        var title = schema[i].title;
        var type_element = 0;
        if (title.indexOf("بالغ") > -1) {
            type_element = 2;
        } else if (title.indexOf("طفل") > -1) {
            type_element = 1;
        }
        var element = document.createElement("div");
        element.className = "passenger-info-content box-content";
        element.setAttribute("data-index", i)
        var element_title = document.createElement("div");
        element_title.className = "title flex-justify font_14";
        element_title.innerHTML =
            `<input class="passenger-type" type="hidden" value=${type_element} name="_root.passengerinfo__${i}.passengerinfo.type"/><div class="type-passenger font-weight">${title}</div><div class="prev-passengers" data-open="0" data-index="${i}" onclick="show_passengersList(this)"><svg data-v-2919ee3e="" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" name="user-clock" color="inherit" type="regular" class="mr-icon-svg svg-inline--fa fa-user-clock"><path data-v-2919ee3e="" fill="" d="M496 224c-79.63 0-144 64.38-144 144s64.38 144 144 144s144-64.38 144-144S575.6 224 496 224zM544 384h-54.25C484.4 384 480 379.6 480 374.3V304c0-8.836 7.164-16 16-16c8.838 0 16 7.164 16 16v48h32c8.838 0 16 7.164 16 15.1S552.8 384 544 384zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48zM395 512H32c-17.67 0-32-14.33-32-32c0-97.2 78.8-176 176-176h96c19.87 0 38.89 3.441 56.7 9.508c-4.963 15.24-7.787 31.41-8.383 48.17C305.4 355.5 289.1 352 272 352h-96c-65.16 0-119.1 48.95-127 112h299.6C360.9 482.8 376.6 499.1 395 512z" class=""></path></svg>قائمة المسافرين السابقين</div>`;
        element.appendChild(element_title);
        var element_children = document.createElement("div");
        element_children.className = "passenger-info-items";

        for (var j = 0; j < schema[i].form.length; j++) {
            var type = schema[i].form[j].type;
            if (type == 132) {
                var element_child_title = schema[i].form[j].question;
                var element_child = document.createElement("div");
                element_child.className = "package-info-item unvisible passenger-mobile";
                var label = document.createElement("label");
                label.innerHTML = element_child_title;
                element_child.appendChild(label);
                var string = `<div>`;
                for (var y = 0; y < schema[i].form[j].inputs.length; y++) {
                    string += `<div class="inner-item"><input `;
                    for (var x = 0; x < schema[i].form[j].inputs[y].attrs.length; x++) {
                        string += schema[i].form[j].inputs[y].attrs[x].attr.name + '="' + schema[i].form[j]
                            .inputs[y].attrs[x].attr.value + '" ';
                    };
                    string += `/></div>`;
                };
                string += `</div>`;
                element_child.innerHTML += string;
                element_children.appendChild(element_child);
            } else if (type == 140) {
                var element_child_title = schema[i].form[j].question;
                var class140 = "gender"
                if (element_child_title == 'نوع التأشيرة') {
                    class140 = "visatype"
                }
                var element_child = document.createElement("div");
                element_child.className = "package-info-item has-select-input";
                var label = document.createElement("label");
                label.innerHTML = element_child_title;
                label.setAttribute("data-label", element_child_title);
                element_child.appendChild(label);
                var string = `<div class="inner-item"><input class="${class140} necessary" type="text" onclick="toggle_gender(this)" onkeyup="tab_key(event,this)" readonly="true"/><input class="gender-id" type="hidden"  `;
                for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                    if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                        .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'class' && schema[i].form[j].attrs[y].attr.name !== 'type') {
                        string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[y]
                            .attr
                            .value + '" ';
                    }

                };

                string += `/></div><ul class='drop-item wide'>`;
                if (string.indexOf('visatype') > -1) {
                    if (document.querySelector(".insurance-duration")) {
                        if (document.querySelector(".insurance-duration").value > 92) {
                            string +=
                                `<li onclick="select_gender_val(this)" class="li-item" data-value="0_2">multiple</li>`
                        } else {
                            for (var x = 0; x < schema[i].form[j].values.length; x++) {
                                string +=
                                    `<li onclick="select_gender_val(this)" class="li-item" data-value="${schema[i].form[j].values[x].value.value}">${schema[i].form[j].values[x].value.title}</li>`
                            };
                        }

                    } else {
                        for (var x = 0; x < schema[i].form[j].values.length; x++) {
                            string +=
                                `<li onclick="select_gender_val(this)" class="li-item" data-value="${schema[i].form[j].values[x].value.value}">${schema[i].form[j].values[x].value.title}</li>`
                        };

                    }

                } else {
                    for (var x = 0; x < schema[i].form[j].values.length; x++) {
                        string +=
                            `<li onclick="select_gender_val(this)" class="li-item" data-value="${schema[i].form[j].values[x].value.value}">${schema[i].form[j].values[x].value.title}</li>`
                    };
                }
                string += `</ul>`;
                element_child.innerHTML += string;



                element_children.appendChild(element_child);
            } else {
                var element_child_title = schema[i].form[j].question;
                if (element_child_title == 'الاسم') {
                    element_child_title = 'الاسم الأول باللغة الإنجليزية';

                } else if (element_child_title == 'اللقب') {
                    element_child_title = 'اللقب باللغة الإنجليزية';
                } else if (element_child_title == 'رقم جواز السفر ') {
                    element_child_title = 'رقم جواز السفر';
                } else if (element_child_title == 'انتهاء صلاحية جواز السفر') {
                    element_child_title = 'انتهاء صلاحية جواز السفر';
                } else if (element_child_title == 'بلد إصدار جواز السفر') {
                    element_child_title = 'بلد إصدار جواز السفر';
                } else if (element_child_title == 'تاریخ الولادة') {
                    element_child_title = `${internal == 'internal' ? 'تاریخ الولادة' : 'تاريخ الميلاد'}`;
                };


                if (element_child_title == 'تاريخ الميلاد' || element_child_title == 'تاریخ الولادة') {
                    var element_child = document.createElement("div");
                    element_child.className = "package-info-item";
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", "تاریخ الولادة");
                    element_child.appendChild(label);
                    var insurance_birthday_splited = "";
                    if (insurance_birthday[i]) {
                        insurance_birthday[i] = insurance_birthday[i].replace(/"/g, '');
                        insurance_birthday_splited = insurance_birthday[i].split("-");
                    };
                    var string = `<div class="passenger-date-items${internal == 'internal' ? ' internal' : ''}"><div class="passenger-date-item has-select"
                       >
                       <div class="inner-item"><input maxlength="2" type="text" ${document.querySelector(".main-container").getAttribute("data-schemaid") == 139 ? 'readonly=true' : ''} onclick="${document.querySelector(".main-container").getAttribute("data-schemaid") == 139 ? `` : `toggle_date(this,'day')`}" placeholder="يوم" class="day necessary" data-id="${insurance_birthday_splited[2] ? insurance_birthday_splited[2] : ''}" value="${insurance_birthday_splited[2] ? insurance_birthday_splited[2] : ''}" oninput="autoComplete_search(event,this,'day')" onblur="autoFill_search(event,this,'passenger-date-item')"  onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);"/></div>
                       <ul class="drop-item">
                           <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="1">1</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="2">2</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="3">3</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="4">4</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="5">5</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="6">6</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="7">7</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="8">8</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="9">9</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="10">10</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="11">11</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="12">12</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="13" data-value="13">13</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="14" data-value="14">14</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="15" data-value="15">15</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="16" data-value="16">16</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="17" data-value="17">17</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="18" data-value="18">18</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="19" data-value="19">19</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="20" data-value="20">20</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="21" data-value="21">21</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="22" data-value="22">22</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="23" data-value="23">23</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="24" data-value="24">24</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="25" data-value="25">25</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="26" data-value="26">26</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="27" data-value="27">27</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="28" data-value="28">28</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="29" data-value="29">29</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="30" data-value="30">30</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="31" data-value="31">31</li>
               
                       </ul>
               
                   </div>
                   <div class="passenger-date-item has-select"
                      >
                      <div class="inner-item"><input maxlength="2" type="text" ${document.querySelector(".main-container").getAttribute("data-schemaid") == 139 ? 'readonly=true' : ''} onclick="${document.querySelector(".main-container").getAttribute("data-schemaid") == 139 ? `` : `toggle_date(this,'month')`}"   placeholder="شهر" class="month necessary" data-id="${insurance_birthday_splited[1] ? insurance_birthday_splited[1] : ''}" value="${insurance_birthday_splited[1] ? insurance_birthday_splited[1] : ''}" oninput="autoComplete_search(event,this,'month')" onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="tab_key(event,this);" /></div>
                      <ul class="drop-item">
               <li onclick="select_date_val(this)" class="li-item" data-id="01" data-switch="January" data-default="January" data-value="January" >
               January
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="02" data-switch="February" data-default="February" data-value="February">
               February
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="03" data-switch="March" data-default="March" data-value="March">March
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="04" data-switch="April" data-default="April" data-value="April">April
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="05" data-switch="May" data-default="May" data-value="May">May
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="06" data-switch="June" data-default="June" data-value="June">June
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="07" data-switch="July" data-default="July" data-value="July">July
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="08" data-switch="August" data-default="August" data-value="August">
               August</li>
               <li onclick="select_date_val(this)" class="li-item" data-id="09" data-switch="September" data-default="September" data-value="September">
               September
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="10" data-switch="October" data-default="October" data-value="October">
               October
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="11" data-switch="November" data-default="November" data-value="November">
               November
               </li>
               <li onclick="select_date_val(this)" class="li-item" data-id="12" data-switch="December" data-default="December" data-value="December">
               December
               </li>
               </ul>
                   </div>
                   <div class="passenger-date-item has-select"
                       >
                       <div class="inner-item"><input maxlength="4" type="text" ${document.querySelector(".main-container").getAttribute("data-schemaid") == 139 ? 'readonly=true' : ''} onclick="${document.querySelector(".main-container").getAttribute("data-schemaid") == 139 ? `` : `toggle_date(this,'year-birthdate')`}" placeholder="سنة" class="year necessary" data-id="${insurance_birthday_splited[0] ? insurance_birthday_splited[0] : ''}" value="${insurance_birthday_splited[0] ? insurance_birthday_splited[0] : ''}" oninput="autoComplete_search(event,this,'year-birthdate')"  onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);"/></div>
                       <ul class="drop-item">
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2024" data-default="2024" data-id="2024" data-value="2024">2024</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2023" data-default="2023" data-id="2023" data-value="2023">2023</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2022" data-default="2022" data-id="2022" data-value="2022">2022</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2021" data-default="2021" data-id="2021" data-value="2021">2021</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2020" data-default="2020" data-id="2020" data-value="2020">2020</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2019" data-default="2019" data-id="2019" data-value="2019">2019</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2018" data-default="2018" data-id="2018" data-value="2018">2018</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2017" data-default="2017" data-id="2017" data-value="2017">2017</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2016" data-default="2016" data-id="2016" data-value="2016">2016</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2015" data-default="2015" data-id="2015" data-value="2015">2015</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2014" data-default="2014" data-id="2014" data-value="2014">2014</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2013" data-default="2013" data-id="2013" data-value="2013">2013</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2012" data-default="2012" data-id="2012" data-value="2012">2012</li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2011" data-default="2011" data-id="2011" data-value="2011">2011
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2010" data-default="2010" data-id="2010" data-value="2010">2010
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2009" data-default="2009" data-id="2009" data-value="2009">2009
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2008" data-default="2008" data-id="2008" data-value="2008">2008
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2007" data-default="2007" data-id="2007" data-value="2007">2007
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2006" data-default="2006" data-id="2006" data-value="2006">2006
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2005" data-default="2005" data-id="2005" data-value="2005">2005
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2004" data-default="2004" data-id="2004" data-value="2004">2004
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2003" data-default="2003" data-id="2003" data-value="2003">2003
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2002" data-default="2002" data-id="2002" data-value="2002">2002
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2001" data-default="2001" data-id="2001" data-value="2001">2001
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="2000" data-default="2000" data-id="2000" data-value="2000">2000
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1999" data-default="1999" data-id="1999" data-value="1999">1999
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1998" data-default="1998" data-id="1998" data-value="1998">1998
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1997" data-default="1997" data-id="1997" data-value="1997">1997
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1996" data-default="1996" data-id="1996" data-value="1996">1996
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1995" data-default="1995" data-id="1995" data-value="1995">1995
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1994" data-default="1994" data-id="1994" data-value="1994">1994
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1993" data-default="1993" data-id="1993" data-value="1993">1993
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1992" data-default="1992" data-id="1992" data-value="1992">1992
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1991" data-default="1991" data-id="1991" data-value="1991">1991
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1990" data-default="1990" data-id="1990" data-value="1990">1990
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1989" data-default="1989" data-id="1989" data-value="1989">1989
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1988" data-default="1988" data-id="1988" data-value="1988">1988
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1987" data-default="1987" data-id="1987" data-value="1987">1987
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1986" data-default="1986" data-id="1986" data-value="1986">1986
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1985" data-default="1985" data-id="1985" data-value="1985">1985
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1984" data-default="1984" data-id="1984" data-value="1984">1984
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1983" data-default="1983" data-id="1983" data-value="1983">1983
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1982" data-default="1982" data-id="1982" data-value="1982">1982
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1981" data-default="1981" data-id="1981" data-value="1981">1981
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1980" data-default="1980" data-id="1980" data-value="1980">1980
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1979" data-default="1979" data-id="1979" data-value="1979">1979
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1978" data-default="1978" data-id="1978" data-value="1978"> 1978
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1977" data-default="1977" data-id="1977" data-value="1977">1977
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1976" data-default="1976" data-id="1976" data-value="1976">1976
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1975" data-default="1975" data-id="1975" data-value="1975">1975
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1974" data-default="1974" data-id="1974" data-value="1974">1974
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1973" data-default="1973" data-id="1973" data-value="1973">1973
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1972" data-default="1972" data-id="1972" data-value="1972"> 1972
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1971" data-default="1971" data-id="1971" data-value="1971">1971
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1970" data-default="1970" data-id="1970" data-value="1970">1970
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1969" data-default="1969" data-id="1969" data-value="1969">1969
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1968" data-default="1968" data-id="1968" data-value="1968">1968
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1967" data-default="1967" data-id="1967" data-value="1967">1967
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1966" data-default="1966" data-id="1966" data-value="1966">1966
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1965" data-default="1965" data-id="1965" data-value="1965"> 1965
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1964" data-default="1964" data-id="1964" data-value="1964">1964
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1963" data-default="1963" data-id="1963" data-value="1963">1963
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1962" data-default="1962" data-id="1962" data-value="1962">1962
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1961" data-default="1961" data-id="1961" data-value="1961">1961
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1960" data-default="1960" data-id="1960" data-value="1960">1960
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1959" data-default="1959" data-id="1959" data-value="1959">1959
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1958" data-default="1958" data-id="1958" data-value="1958">1958
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1957" data-default="1957" data-id="1957" data-value="1957">1957
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1956" data-default="1956" data-id="1956" data-value="1956">1956
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1955" data-default="1955" data-id="1955" data-value="1955">1955
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1954" data-default="1954" data-id="1954" data-value="1954">1954
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1953" data-default="1953" data-id="1953" data-value="1953">1953
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1952" data-default="1952" data-id="1952" data-value="1952">1952
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1951" data-default="1951" data-id="1951" data-value="1951">1951
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1950" data-default="1950" data-id="1950" data-value="1950">1950
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="$1949" data-default="1949" data-id="1949" data-value="1949">1949
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1948" data-default="1948" data-id="1948" data-value="1948">1948
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1947" data-default="1947" data-id="1947" data-value="1947">1947
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1946" data-default="1946" data-id="1946" data-value="1946">1946
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1945" data-default="1945" data-id="1945" data-value="1945">1945
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1944" data-default="1944" data-id="1944" data-value="1944">1944
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1943" data-default="1943" data-id="1943" data-value="1943">1943
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1942" data-default="1942" data-id="1942" data-value="1942">1942
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="$1941" data-default="1941" data-id="1941" data-value="1941">1941
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1940" data-default="1940" data-id="1940" data-value="1940">1940
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1939" data-default="1939" data-id="1939" data-value="1939">1939
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1938" data-default="1938" data-id="1938" data-value="1938">1938
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1937" data-default="1937" data-id="1937" data-value="1937">1937
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1936" data-default="1936" data-id="1936" data-value="1936">1936
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1935" data-default="1935" data-id="1935" data-value="1935">1935
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1934" data-default="1934" data-id="1934" data-value="1934">1934
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1933" data-default="1933" data-id="1933" data-value="1933">1933
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1932" data-default="1932" data-id="1932" data-value="1932">1932
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1931" data-default="1931" data-id="1931" data-value="1931">1931
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1930" data-default="1930" data-id="1930" data-value="1930">1930
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1929" data-default="1929" data-id="1929" data-value="1929">1929
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1928" data-default="1928" data-id="1928" data-value="1928">1928
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1927" data-default="1927" data-id="1927" data-value="1927">1927
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1926" data-default="1926" data-id="1926" data-value="1926"> 1926
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1925" data-default="1925" data-id="1925" data-value="1925"> 1925
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1924" data-default="1924" data-id="1924" data-value="1924">1924
                       </li>
                       <li onclick="select_date_val(this)" class="li-item" data-switch="1923" data-default="1923" data-id="1923" data-value="1923">1923
                       </li>
                   </div><input type="hidden" value="${insurance_birthday[i] ? insurance_birthday[i] : ''}" `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'type') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);

                } else if (element_child_title == 'انتهاء صلاحية جواز السفر') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item ${internal}`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);



                    var string = `<div class="passenger-date-items${internal == 'internal' ? ' internal' : ''}"> <div class="passenger-date-item has-select"
                                                          >
                                                          <div class="inner-item"><input maxlength="2" type="text"  onclick="toggle_date(this,'day')" placeholder="يوم" class="day${internal == 'internal' ? '' : ' necessary'}" oninput="autoComplete_search(event,this,'day')"  onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                           <ul class="drop-item">
                                                               <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="1">1</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="2">2</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="3">3</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="4">4</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="5">5</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="6">6</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="7">7</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="8">8</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="9">9</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="10">10</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="11">11</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="12">12</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="13" data-value="13">13</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="14" data-value="14">14</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="15" data-value="15">15</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="16" data-value="16">16</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="17" data-value="17">17</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="18" data-value="18">18</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="19" data-value="19">19</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="20" data-value="20">20</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="21" data-value="21">21</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="22" data-value="22">22</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="23" data-value="23">23</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="24" data-value="24">24</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="25" data-value="25">25</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="26" data-value="26">26</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="27" data-value="27">27</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="28" data-value="28">28</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="29" data-value="29">29</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="30" data-value="30">30</li>
   <li onclick="select_date_val(this)" class="li-item" data-id="31" data-value="31">31</li>
                                                           </ul>
   
                                                       </div>
                                                       <div class="passenger-date-item has-select"
                                                         >
                                                         <div class="inner-item"><input maxlength="2" type="text"  onclick="toggle_date(this,'month')" placeholder="شهر" class="month${internal == 'internal' ? '' : ' necessary'}"   oninput="autoComplete_search(event,this,'month')"  onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="tab_key(event,this);" data-id=""/></div>
                                                         <ul class="drop-item">
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="01" data-switch="January" data-default="January" data-value="January" >
                                                         January
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="02" data-switch="February" data-default="February" data-value="February">
                                                         February
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="03" data-switch="March" data-default="March" data-value="March">March
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="04" data-switch="April" data-default="April" data-value="April">April
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="05" data-switch="May" data-default="May" data-value="May">May
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="06" data-switch="June" data-default="June" data-value="June">June
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="07" data-switch="July" data-default="July" data-value="July">July
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="08" data-switch="August" data-default="August" data-value="August">
                                                         August</li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="09" data-switch="September" data-default="September" data-value="September">
                                                         September
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="10" data-switch="October" data-default="October" data-value="October">
                                                         October
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="11" data-switch="November" data-default="November" data-value="November">
                                                         November
                                                         </li>
                                                         <li onclick="select_date_val(this)" class="li-item" data-id="12" data-switch="December" data-default="December" data-value="December">
                                                         December
                                                         </li>
                                                         </ul>
                                                       </div>
                                                       <div class="passenger-date-item has-select"
                                                          >
                                                          <div class="inner-item"><input maxlength="4" type="text"  onclick="toggle_date(this,'year-passport')"  placeholder="سنة" class="year${internal == 'internal' ? '' : ' necessary'}" oninput="autoComplete_search(event,this,'year-passport')"  onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                          <ul class="drop-item">
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2024" data-default="2024" data-id="2024" data-value="2024">2024
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2025" data-default="2025" data-id="2025" data-value="2025">2025
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2026" data-default="2026" data-id="2026" data-value="2026">2026
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2027" data-default="2027" data-id="2027" data-value="2027">2027
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2028" data-default="2028" data-id="2028" data-value="2028">2028
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2029" data-default="2029" data-id="2029" data-value="2029">2029
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2030" data-default="2030" data-id="2030" data-value="2030">2030
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2031" data-default="2031" data-id="2031" data-value="2031">2031
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2032" data-default="2032" data-id="2032" data-value="2032">2032
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2033" data-default="2033" data-id="2033" data-value="2033">2033
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2034" data-default="2034" data-id="2034" data-value="2034">2034
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2035" data-default="2035" data-id="2035" data-value="2035">2035
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2036" data-default="2036" data-id="2036" data-value="2036">2036
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2037" data-default="2037" data-id="2037" data-value="2037">2037
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="$2038" data-default="2038" data-id="2038" data-value="2038">2038
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2039" data-default="2039" data-id="2039" data-value="2039">2039
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2040" data-default="2040" data-id="2040" data-value="2040">2040
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2041" data-default="2041" data-id="2041" data-value="2041">2041
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2042" data-default="2042" data-id="2042" data-value="2042">2042
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2043" data-default="2043" data-id="2043" data-value="2043">2043
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="$2044" data-default="2044" data-id="2044" data-value="2044">2044
                                                          </li>
                                                          <li onclick="select_date_val(this)" class="li-item" data-switch="2045" data-default="2045" data-id="2045" data-value="2045">2045
                                                          </li>
                                                          </ul>
                                                       </div><input type="hidden" value="${internal == 'internal' ? '-' : ''}" class="datepicker passexpiredate"`;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'type' && schema[i].form[j].attrs[y].attr.name !== 'class') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);
                } else if (element_child_title == 'الجنسية') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item has-select-input`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    var input_name = "";
                    var string = `<div class="inner-item"><input value="ایران"  data-value="ایران" oninput="autoComplete_search(event,this,'area')" onblur="autoFill_search(event,this,'package-info-item')" onkeyup="tab_key(event,this);" onclick="toggle_area(this)"  `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'name') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                        if (schema[i].form[j].attrs[y].attr.name == 'name') {
                            input_name = schema[i].form[j].attrs[y].attr.value;
                        }
                    };
                    string += `/></div><input type="hidden" value="1002236" name="${input_name}" class="area-id issuecountry"/><ul class="drop-item wide">
                               <li onclick="select_area_val(this)" class="li-item" data-value="ایران" data-id="1002236">ایران</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="أذربيجان" data-id="1002227">أذربيجان</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="الأرجنتين" data-id="1002172">الأرجنتين</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="آروبا" data-id="1002139">آروبا</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="جنوب أفريقيا" data-id="1002126">جنوب أفريقيا</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="أفريقيا الوسطى" data-id="1002087">أفريقيا الوسطى</li>
   <li
       onclick="select_area_val(this)" class="li-item" data-value="ألبانيا"
       data-id="1002040">ألبانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="ألمانيا"
       data-id="1002052">ألمانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="أنتيغوا وبربودا"
       data-id="1002138">أنتيغوا وبربودا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أندورا" data-id="1002041">أندورا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أنغولا" data-id="1002081">أنغولا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أنغيلا" data-id="1002137">أنغيلا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اتریش" data-id="1002042">اتریش</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أثيوبيا" data-id="1002096">أثيوبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الأردن" data-id="1002239">الأردن</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أرمينيا" data-id="1002226">أرمينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوروغواي" data-id="1002180">أوروغواي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="إريتريا" data-id="1002095">إريتريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوزبكستان" data-id="1002230">أوزبكستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="إسبانيا" data-id="1002077">إسبانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أستراليا" data-id="1002187">أستراليا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="إستونيا" data-id="1002048">إستونيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سلوفاكيا" data-id="1002075">سلوفاكيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سلوفينيا" data-id="1002076">سلوفينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أفغانستان" data-id="1002212">أفغانستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الاكوادور" data-id="1002176">الاكوادور</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الجزائر" data-id="1002080">الجزائر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سلفادور" data-id="1002149">سلفادور</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الإمارات العربية المتحدة" data-id="1002248">الإمارات العربية المتحدة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أندونيسيا" data-id="1002256">أندونيسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="انجلترا" data-id="1167330">انجلترا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوكرانيا" data-id="1002039">أوكرانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوغندا" data-id="1002132">أوغندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ولايات ميكرونيزيا الموحدة" data-id="1002196">ولايات ميكرونيزيا الموحدة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ایالات متحده" data-id="1002211">ایالات متحده</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الولايات المتحدة الجزر الهامشية" data-id="1198858">الولايات المتحدة الجزر الهامشية</li><li onclick="select_area_val(this)" class="li-item" data-value="ایتالیا" data-id="1002059">ایتالیا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أيسلندا" data-id="1002034">أيسلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بربادوس" data-id="1002141">بربادوس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر البهاما" data-id="1002140">جزر البهاما</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البحرين" data-id="1002234">البحرين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البرازيل" data-id="1002174">البرازيل</li><li
       onclick="select_area_val(this)" class="li-item" data-value="برمودا" data-id="1002167">برمودا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بروناي" data-id="1002250">بروناي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بيلاروسيا" data-id="1002037">بيلاروسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بلجيكا" data-id="1002043">بلجيكا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بلغاريا" data-id="1002044">بلغاريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بليز" data-id="1002142">بليز</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بنغلاديش" data-id="1002213">بنغلاديش</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بنين" data-id="1002082">بنين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بوتسوانا" data-id="1002083">بوتسوانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورما" data-id="1002251">بورما</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البوسنة والهرسك" data-id="1002036">البوسنة والهرسك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بوليفيا" data-id="1002173">بوليفيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مملكة بوتان" data-id="1002214">مملكة بوتان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="باراجواي" data-id="1002181">باراجواي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="باكستان" data-id="1002222">باكستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بالاو" data-id="1002203">بالاو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بنما" data-id="1002159">بنما</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البرتغال" data-id="1002072">البرتغال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بيرو" data-id="1002182">بيرو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بولينيزيا الفرنسية" data-id="1002190">بولينيزيا الفرنسية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورتوريكو" data-id="1002160">بورتوريكو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="طاجيكستان" data-id="1002232">طاجيكستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تنزانيا" data-id="1002129">تنزانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تايلاند" data-id="1002264">تايلاند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تايوان" data-id="1002263">تايوان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تركمانستان" data-id="1002233">تركمانستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تركيا" data-id="1002247">تركيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ترينيداد وتوباغو" data-id="1002164">ترينيداد وتوباغو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="توغو" data-id="1002130">توغو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تونس" data-id="1002131">تونس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تونغا" data-id="1002209">تونغا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="توفالو" data-id="1002210">توفالو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تيمور الشرقية" data-id="1193762">تيمور الشرقية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جامايكا" data-id="1002155">جامايكا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جبل طارق" data-id="1002053">جبل طارق</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر سليمان" data-id="1002207">جزر سليمان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر فوكلاند (مالفيناس)" data-id="1002177">جزر فوكلاند
       (مالفيناس)</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر فيجي" data-id="1002189">جزر
       فيجي</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر كوك" data-id="1002188">جزر
       كوك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر كايمان" data-id="1002144">جزر كايمان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر مارشال" data-id="1002195">جزر مارشال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر ماريانا الشمالية" data-id="1002202">جزر ماريانا
       الشمالية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر والیس و فوتونا" data-id="1002194">جزر والیس و
       فوتونا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(أمريكا)" data-id="1002166">جزر ویرجین
       (أمريكا)</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(بريطانيا)" data-id="1002143">جزر ویرجین
       (بريطانيا)</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزیره جوادلوب" data-id="1002151">جزیره جوادلوب</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جمهورية أيرلندا" data-id="1002057">جمهورية أيرلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الجمهورية التشيكية" data-id="1002046">الجمهورية التشيكية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جمهورية الدومينيكان" data-id="1002148">جمهورية الدومينيكان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جيبوتي" data-id="1002092">جيبوتي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تشاد" data-id="1002088">تشاد</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الصين" data-id="1002215">الصين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الدنمارك" data-id="1002047">الدنمارك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="دومینیکا" data-id="1002147">دومینیکا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="رواندا" data-id="1002119">رواندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="روسيا" data-id="1002035">روسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="رومانيا" data-id="1002073">رومانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="زامبيا" data-id="1002104">زامبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اليابان" data-id="1002217">اليابان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سان تومي وبرينسيبي" data-id="1002121">سان تومي وبرينسيبي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ساحل العاج" data-id="1167335">ساحل العاج</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سریلانکا" data-id="1002225">سریلانکا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سان بيير وميكلون" data-id="1002170">سان بيير وميكلون</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت كيتس ونيفيس" data-id="1002161">سانت كيتس ونيفيس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت لوسيا" data-id="1002162">سانت لوسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت هيلين" data-id="1002120">سانت هيلين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت فنسنت وجزر غرينادين" data-id="1002163">سانت فنسنت و غرينادين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سنغافورة" data-id="1002262">سنغافورة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="السنغال" data-id="1002122">السنغال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="السويد" data-id="1002078">السويد</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سويسرا" data-id="1002079">سويسرا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سوازيلاند" data-id="1002128">سوازيلاند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="السودان" data-id="1002127">السودان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سورينام" data-id="1002183">سورينام</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سوريا" data-id="1002246">سوريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الصومال" data-id="1002125">الصومال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سيراليون" data-id="1002124">سيراليون</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سيشيل" data-id="1002123">سيشيل</li><li
       onclick="select_area_val(this)" class="li-item" data-value="شيلي" data-id="1002175">شيلي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="صربيا" data-id="1167332">صربيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="العراق" data-id="1002237">العراق</li><li
       onclick="select_area_val(this)" class="li-item" data-value="المملكة العربية السعودية" data-id="1002245">المملكة العربية السعودية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="عمان" data-id="1002243">عمان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غانا" data-id="1002099">غانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فرنسا" data-id="1002051">فرنسا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فنلندا" data-id="1002050">فنلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فيلبيني" data-id="1002261">فيلبيني</li><li
       onclick="select_area_val(this)" class="li-item" data-value="قبرص" data-id="1002235">قبرص</li><li
       onclick="select_area_val(this)" class="li-item" data-value="قيرغيزستان" data-id="1002231">قيرغيزستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كازاخستان" data-id="1002229">كازاخستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="قطر" data-id="1002244">قطر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كوستاريكا" data-id="1002145">كوستاريكا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كاليدونيا الجديدة" data-id="1002198">كاليدونيا الجديدة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كمبوديا" data-id="1002252">كمبوديا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكاميرون" data-id="1002086">الكاميرون</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كندا" data-id="1002168">كندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كوريا الجنوبية" data-id="1002224">كوريا الجنوبية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كرواتيا" data-id="1002045">كرواتيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كولومبيا" data-id="1002184">كولومبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكونغو" data-id="1002090">الكونغو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكونغو، الجمهورية الديمقراطية" data-id="1198851">الكونغو، الجمهورية الديمقراطية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كينيا" data-id="1002102">كينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="کوبا" data-id="1002146">کوبا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر القمر" data-id="1002089">جزر القمر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكويت" data-id="1002241">الكويت</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الرأس الأخضر" data-id="1002133">الرأس الأخضر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كيريباتي" data-id="1002192">كيريباتي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غامبيا" data-id="1002098">غامبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جورجيا" data-id="1002228">جورجيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جرينلاند" data-id="1002136">جرينلاند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غواتيمالا" data-id="1002152">غواتيمالا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غيانا" data-id="1002179">غيانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غينيا" data-id="1002100">غينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غينيا الاستوائية" data-id="1002094">غينيا الاستوائية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غينيا بيساو" data-id="1002101">غينيا بيساو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="لاوس" data-id="1002258">لاوس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="لبنان" data-id="1002242">لبنان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ليسوتو" data-id="1002106">ليسوتو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بولندا" data-id="1002071">بولندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ليبيا" data-id="1002108">ليبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مدغشقر" data-id="1002109">مدغشقر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مارتينيك" data-id="1002156">مارتينيك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ماكاو" data-id="1002259">ماكاو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ملاوي" data-id="1002110">ملاوي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مالطا" data-id="1002067">مالطا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ماليزيا" data-id="1002260">ماليزيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تمويل" data-id="1002111">تمويل</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هنغاريا" data-id="1002056">هنغاريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="المغرب" data-id="1002114">المغرب</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مصر" data-id="1002093">مصر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="منغوليا" data-id="1002219">منغوليا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مقدونيا" data-id="1002066">مقدونيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="المكسيك" data-id="1002169">المكسيك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="موريتانيا" data-id="1002112">موريتانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="موريشيوس" data-id="1002134">موريشيوس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="موزمبيق" data-id="1002115">موزمبيق</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ناورو" data-id="1002197">ناورو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيبال" data-id="1002220">نيبال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="النرويج" data-id="1002070">النرويج</li><li
       onclick="select_area_val(this)" class="li-item" data-value="النيجر" data-id="1002117">النيجر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيجيريا" data-id="1002118">نيجيريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيكاراغوا" data-id="1002158">نيكاراغوا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيوزيلندا" data-id="1002199">نيوزيلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هايتي" data-id="1002153">هايتي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هولندا" data-id="1002069">هولندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الهند" data-id="1002216">الهند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هندوراس" data-id="1002154">هندوراس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هونج كونج" data-id="1002255">هونج كونج</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فانواتو" data-id="1002193">فانواتو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فنزويلا" data-id="1002185">فنزويلا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فيتنام" data-id="1002257">فيتنام</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اليمن" data-id="1002240">اليمن</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اليونان" data-id="1002054">اليونان</li>
   </ul></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);

                } else if (element_child_title == 'بلد الإقامة') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item has-select-input ${internal}`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    var input_name = "";
                    var string = `<div class="inner-item"><input value="ایران" data-value="ایران" oninput="autoComplete_search(event,this,'area')" onblur="autoFill_search(event,this,'package-info-item')" onkeyup="tab_key(event,this)" onclick="toggle_area(this)" `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'name') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                        if (schema[i].form[j].attrs[y].attr.name == 'name') {
                            input_name = schema[i].form[j].attrs[y].attr.value;
                        }
                    };
                    string += `/></div><input type="hidden" value="1002236" name="${input_name}" class="countryofresistance area-id"/><ul class="drop-item wide">
                               <li onclick="select_area_val(this)" class="li-item" data-value="ایران" data-id="1002236">ایران</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="أذربيجان" data-id="1002227">أذربيجان</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="الأرجنتين" data-id="1002172">الأرجنتين</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="آروبا" data-id="1002139">آروبا</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="جنوب أفريقيا" data-id="1002126">جنوب أفريقيا</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="أفريقيا الوسطى" data-id="1002087">أفريقيا الوسطى</li>
   <li
       onclick="select_area_val(this)" class="li-item" data-value="ألبانيا"
       data-id="1002040">ألبانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="ألمانيا"
       data-id="1002052">ألمانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="أنتيغوا وبربودا"
       data-id="1002138">أنتيغوا وبربودا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أندورا" data-id="1002041">أندورا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أنغولا" data-id="1002081">أنغولا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أنغيلا" data-id="1002137">أنغيلا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اتریش" data-id="1002042">اتریش</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أثيوبيا" data-id="1002096">أثيوبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الأردن" data-id="1002239">الأردن</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أرمينيا" data-id="1002226">أرمينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوروغواي" data-id="1002180">أوروغواي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="إريتريا" data-id="1002095">إريتريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوزبكستان" data-id="1002230">أوزبكستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="إسبانيا" data-id="1002077">إسبانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أستراليا" data-id="1002187">أستراليا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="إستونيا" data-id="1002048">إستونيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سلوفاكيا" data-id="1002075">سلوفاكيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سلوفينيا" data-id="1002076">سلوفينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أفغانستان" data-id="1002212">أفغانستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الاكوادور" data-id="1002176">الاكوادور</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الجزائر" data-id="1002080">الجزائر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سلفادور" data-id="1002149">سلفادور</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الإمارات العربية المتحدة" data-id="1002248">الإمارات العربية المتحدة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أندونيسيا" data-id="1002256">أندونيسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="انجلترا" data-id="1167330">انجلترا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوكرانيا" data-id="1002039">أوكرانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوغندا" data-id="1002132">أوغندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ولايات ميكرونيزيا الموحدة" data-id="1002196">ولايات ميكرونيزيا الموحدة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ایالات متحده" data-id="1002211">ایالات متحده</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الولايات المتحدة الجزر الهامشية" data-id="1198858">الولايات المتحدة الجزر الهامشية</li><li onclick="select_area_val(this)" class="li-item" data-value="ایتالیا" data-id="1002059">ایتالیا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أيسلندا" data-id="1002034">أيسلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بربادوس" data-id="1002141">بربادوس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر البهاما" data-id="1002140">جزر البهاما</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البحرين" data-id="1002234">البحرين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البرازيل" data-id="1002174">البرازيل</li><li
       onclick="select_area_val(this)" class="li-item" data-value="برمودا" data-id="1002167">برمودا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بروناي" data-id="1002250">بروناي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بيلاروسيا" data-id="1002037">بيلاروسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بلجيكا" data-id="1002043">بلجيكا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بلغاريا" data-id="1002044">بلغاريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بليز" data-id="1002142">بليز</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بنغلاديش" data-id="1002213">بنغلاديش</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بنين" data-id="1002082">بنين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بوتسوانا" data-id="1002083">بوتسوانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورما" data-id="1002251">بورما</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البوسنة والهرسك" data-id="1002036">البوسنة والهرسك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بوليفيا" data-id="1002173">بوليفيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مملكة بوتان" data-id="1002214">مملكة بوتان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="باراجواي" data-id="1002181">باراجواي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="باكستان" data-id="1002222">باكستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بالاو" data-id="1002203">بالاو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بنما" data-id="1002159">بنما</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البرتغال" data-id="1002072">البرتغال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بيرو" data-id="1002182">بيرو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بولينيزيا الفرنسية" data-id="1002190">بولينيزيا الفرنسية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورتوريكو" data-id="1002160">بورتوريكو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="طاجيكستان" data-id="1002232">طاجيكستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تنزانيا" data-id="1002129">تنزانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تايلاند" data-id="1002264">تايلاند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تايوان" data-id="1002263">تايوان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تركمانستان" data-id="1002233">تركمانستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تركيا" data-id="1002247">تركيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ترينيداد وتوباغو" data-id="1002164">ترينيداد وتوباغو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="توغو" data-id="1002130">توغو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تونس" data-id="1002131">تونس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تونغا" data-id="1002209">تونغا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="توفالو" data-id="1002210">توفالو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تيمور الشرقية" data-id="1193762">تيمور الشرقية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جامايكا" data-id="1002155">جامايكا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جبل طارق" data-id="1002053">جبل طارق</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر سليمان" data-id="1002207">جزر سليمان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر فوكلاند (مالفيناس)" data-id="1002177">جزر فوكلاند (مالفيناس)</li><li 
       onclick="select_area_val(this)" class="li-item" data-value="جزر فيجي" data-id="1002189">جزر فيجي</li><li 
       onclick="select_area_val(this)" class="li-item" data-value="جزر كوك" data-id="1002188">جزر كوك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر كايمان" data-id="1002144">جزر كايمان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر مارشال" data-id="1002195">جزر مارشال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر ماريانا الشمالية" data-id="1002202">جزر ماريانا الشمالية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر والیس و فوتونا" data-id="1002194">جزر والیس و
       فوتونا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(أمريكا)" data-id="1002166">جزر ویرجین
       (أمريكا)</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(بريطانيا)" data-id="1002143">جزر ویرجین
       (بريطانيا)</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزیره جوادلوب" data-id="1002151">جزیره جوادلوب</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جمهورية أيرلندا" data-id="1002057">جمهورية أيرلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الجمهورية التشيكية" data-id="1002046">الجمهورية التشيكية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جمهورية الدومينيكان" data-id="1002148">جمهورية الدومينيكان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جيبوتي" data-id="1002092">جيبوتي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تشاد" data-id="1002088">تشاد</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الصين" data-id="1002215">الصين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الدنمارك" data-id="1002047">الدنمارك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="دومینیکا" data-id="1002147">دومینیکا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="رواندا" data-id="1002119">رواندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="روسيا" data-id="1002035">روسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="رومانيا" data-id="1002073">رومانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="زامبيا" data-id="1002104">زامبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اليابان" data-id="1002217">اليابان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سان تومي وبرينسيبي" data-id="1002121">سان تومي وبرينسيبي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ساحل العاج" data-id="1167335">ساحل العاج</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سریلانکا" data-id="1002225">سریلانکا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سان بيير وميكلون" data-id="1002170">سان بيير وميكلون</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت كيتس ونيفيس" data-id="1002161">سانت كيتس ونيفيس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت لوسيا" data-id="1002162">سانت لوسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت هيلين" data-id="1002120">سانت هيلين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت فنسنت وجزر غرينادين" data-id="1002163">سانت فنسنت و
       غرينادين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سنغافورة" data-id="1002262">سنغافورة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="السنغال" data-id="1002122">السنغال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="السويد" data-id="1002078">السويد</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سويسرا" data-id="1002079">سويسرا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سوازيلاند" data-id="1002128">سوازيلاند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="السودان" data-id="1002127">السودان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سورينام" data-id="1002183">سورينام</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سوريا" data-id="1002246">سوريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الصومال" data-id="1002125">الصومال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سيراليون" data-id="1002124">سيراليون</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سيشيل" data-id="1002123">سيشيل</li><li
       onclick="select_area_val(this)" class="li-item" data-value="شيلي" data-id="1002175">شيلي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="صربيا" data-id="1167332">صربيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="العراق" data-id="1002237">العراق</li><li
       onclick="select_area_val(this)" class="li-item" data-value="المملكة العربية السعودية" data-id="1002245">المملكة العربية السعودية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="عمان" data-id="1002243">عمان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غانا" data-id="1002099">غانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فرنسا" data-id="1002051">فرنسا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فنلندا" data-id="1002050">فنلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فيلبيني" data-id="1002261">فيلبيني</li><li
       onclick="select_area_val(this)" class="li-item" data-value="قبرص" data-id="1002235">قبرص</li><li
       onclick="select_area_val(this)" class="li-item" data-value="قيرغيزستان" data-id="1002231">قيرغيزستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كازاخستان" data-id="1002229">كازاخستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="قطر" data-id="1002244">قطر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كوستاريكا" data-id="1002145">كوستاريكا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كاليدونيا الجديدة" data-id="1002198">كاليدونيا الجديدة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كمبوديا" data-id="1002252">كمبوديا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكاميرون" data-id="1002086">الكاميرون</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كندا" data-id="1002168">كندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كوريا الجنوبية" data-id="1002224">كوريا الجنوبية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كرواتيا" data-id="1002045">كرواتيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كولومبيا" data-id="1002184">كولومبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكونغو" data-id="1002090">الكونغو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكونغو، الجمهورية الديمقراطية" data-id="1198851">الكونغو، جمهورية
       الديمقراطية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كينيا" data-id="1002102">كينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="کوبا" data-id="1002146">کوبا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر القمر" data-id="1002089">جزر القمر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكويت" data-id="1002241">الكويت</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الرأس الأخضر" data-id="1002133">الرأس الأخضر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كيريباتي" data-id="1002192">كيريباتي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غامبيا" data-id="1002098">غامبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جورجيا" data-id="1002228">جورجيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جرينلاند" data-id="1002136">جرينلاند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غواتيمالا" data-id="1002152">غواتيمالا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غيانا" data-id="1002179">غيانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غينيا" data-id="1002100">غينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غينيا الاستوائية" data-id="1002094">غينيا الاستوائية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غينيا بيساو" data-id="1002101">غينيا بيساو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="لاوس" data-id="1002258">لاوس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="لبنان" data-id="1002242">لبنان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ليسوتو" data-id="1002106">ليسوتو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بولندا" data-id="1002071">بولندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ليبيا" data-id="1002108">ليبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مدغشقر" data-id="1002109">مدغشقر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مارتينيك" data-id="1002156">مارتينيك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ماكاو" data-id="1002259">ماكاو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ملاوي" data-id="1002110">ملاوي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مالطا" data-id="1002067">مالطا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ماليزيا" data-id="1002260">ماليزيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تمويل" data-id="1002111">تمويل</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هنغاريا" data-id="1002056">هنغاريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="المغرب" data-id="1002114">المغرب</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مصر" data-id="1002093">مصر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="منغوليا" data-id="1002219">منغوليا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مقدونيا" data-id="1002066">مقدونيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="المكسيك" data-id="1002169">المكسيك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="موريتانيا" data-id="1002112">موريتانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="موريشيوس" data-id="1002134">موريشيوس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="موزمبيق" data-id="1002115">موزمبيق</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ناورو" data-id="1002197">ناورو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيبال" data-id="1002220">نيبال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="النرويج" data-id="1002070">النرويج</li><li
       onclick="select_area_val(this)" class="li-item" data-value="النيجر" data-id="1002117">النيجر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيجيريا" data-id="1002118">نيجيريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيكاراغوا" data-id="1002158">نيكاراغوا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيوزيلندا" data-id="1002199">نيوزيلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هايتي" data-id="1002153">هايتي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هولندا" data-id="1002069">هولندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الهند" data-id="1002216">الهند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هندوراس" data-id="1002154">هندوراس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هونج كونج" data-id="1002255">هونج كونج</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فانواتو" data-id="1002193">فانواتو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فنزويلا" data-id="1002185">فنزويلا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فيتنام" data-id="1002257">فيتنام</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اليمن" data-id="1002240">اليمن</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اليونان" data-id="1002054">اليونان</li>
   </ul></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);


                } else if (element_child_title == 'بلد إصدار جواز السفر') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item has-select-input unvisible ${internal}`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    var input_name = "";
                    var string = `<div class="inner-item"><input value="ایران" data-value="ایران" oninput="autoComplete_search(event,this,'area')" onblur="autoFill_search(event,this,'package-info-item')" onkeyup="tab_key(event,this)" onclick="toggle_area(this)" `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'name') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                        if (schema[i].form[j].attrs[y].attr.name == 'name') {
                            input_name = schema[i].form[j].attrs[y].attr.value;
                        }
                    };
                    string += `/></div><input type="hidden" value="1002236" name="${input_name}" class="area-id passportissuecountry"/><ul class="drop-item wide">
                               <li onclick="select_area_val(this)" class="li-item" data-value="ایران" data-id="1002236">ایران</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="أذربيجان" data-id="1002227">أذربيجان</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="الأرجنتين" data-id="1002172">الأرجنتين</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="آروبا" data-id="1002139">آروبا</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="جنوب أفريقيا" data-id="1002126">جنوب أفريقيا</li>
   <li onclick="select_area_val(this)" class="li-item" data-value="أفريقيا الوسطى" data-id="1002087">أفريقيا الوسطى</li>
   <li
       onclick="select_area_val(this)" class="li-item" data-value="ألبانيا"
       data-id="1002040">ألبانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="ألمانيا"
       data-id="1002052">ألمانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="أنتيغوا وبربودا"
       data-id="1002138">أنتيغوا وبربودا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أندورا" data-id="1002041">أندورا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أنغولا" data-id="1002081">أنغولا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أنغيلا" data-id="1002137">أنغيلا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اتریش" data-id="1002042">اتریش</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أثيوبيا" data-id="1002096">أثيوبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الأردن" data-id="1002239">الأردن</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أرمينيا" data-id="1002226">أرمينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوروغواي" data-id="1002180">أوروغواي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="إريتريا" data-id="1002095">إريتريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوزبكستان" data-id="1002230">أوزبكستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="إسبانيا" data-id="1002077">إسبانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أستراليا" data-id="1002187">أستراليا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="إستونيا" data-id="1002048">إستونيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سلوفاكيا" data-id="1002075">سلوفاكيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سلوفينيا" data-id="1002076">سلوفينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أفغانستان" data-id="1002212">أفغانستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الاكوادور" data-id="1002176">الاكوادور</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الجزائر" data-id="1002080">الجزائر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سلفادور" data-id="1002149">سلفادور</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الإمارات العربية المتحدة" data-id="1002248">الإمارات العربية المتحدة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أندونيسيا" data-id="1002256">أندونيسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="انجلترا" data-id="1167330">انجلترا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوكرانيا" data-id="1002039">أوكرانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أوغندا" data-id="1002132">أوغندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ولايات ميكرونيزيا الموحدة" data-id="1002196">ولايات ميكرونيزيا الموحدة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ایالات متحده" data-id="1002211">ایالات متحده</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الولايات المتحدة الجزر الهامشية" data-id="1198858">الولايات المتحدة الجزر الهامشية</li><li onclick="select_area_val(this)" class="li-item" data-value="ایتالیا" data-id="1002059">ایتالیا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="أيسلندا" data-id="1002034">أيسلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بربادوس" data-id="1002141">بربادوس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر البهاما" data-id="1002140">جزر البهاما</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البحرين" data-id="1002234">البحرين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البرازيل" data-id="1002174">البرازيل</li><li
       onclick="select_area_val(this)" class="li-item" data-value="برمودا" data-id="1002167">برمودا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بروناي" data-id="1002250">بروناي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بيلاروسيا" data-id="1002037">بيلاروسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بلجيكا" data-id="1002043">بلجيكا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بلغاريا" data-id="1002044">بلغاريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بليز" data-id="1002142">بليز</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بنغلاديش" data-id="1002213">بنغلاديش</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بنين" data-id="1002082">بنين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بوتسوانا" data-id="1002083">بوتسوانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورما" data-id="1002251">بورما</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البوسنة والهرسك" data-id="1002036">البوسنة والهرسك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بوليفيا" data-id="1002173">بوليفيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مملكة بوتان" data-id="1002214">مملكة بوتان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="باراجواي" data-id="1002181">باراجواي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="باكستان" data-id="1002222">باكستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بالاو" data-id="1002203">بالاو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بنما" data-id="1002159">بنما</li><li
       onclick="select_area_val(this)" class="li-item" data-value="البرتغال" data-id="1002072">البرتغال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بيرو" data-id="1002182">بيرو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بولينيزيا الفرنسية" data-id="1002190">بولينيزيا الفرنسية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورتوريكو" data-id="1002160">بورتوريكو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="طاجيكستان" data-id="1002232">طاجيكستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تنزانيا" data-id="1002129">تنزانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تايلاند" data-id="1002264">تايلاند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تايوان" data-id="1002263">تايوان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تركمانستان" data-id="1002233">تركمانستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تركيا" data-id="1002247">تركيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ترينيداد وتوباغو" data-id="1002164">ترينيداد وتوباغو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="توغو" data-id="1002130">توغو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تونس" data-id="1002131">تونس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تونغا" data-id="1002209">تونغا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="توفالو" data-id="1002210">توفالو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تيمور الشرقية" data-id="1193762">تيمور الشرقية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جامايكا" data-id="1002155">جامايكا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جبل طارق" data-id="1002053">جبل طارق</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر سليمان" data-id="1002207">جزر سليمان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر فوكلاند (مالفيناس)" data-id="1002177">جزر فوكلاند
       (مالفيناس)</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر فيجي" data-id="1002189">جزر
       فيجي</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر كوك" data-id="1002188">جزر
       كوك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر كايمان" data-id="1002144">جزر كايمان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر مارشال" data-id="1002195">جزر مارشال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر ماريانا الشمالية" data-id="1002202">جزر ماريانا
       الشمالية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر والیس و فوتونا" data-id="1002194">جزر والیس و
       فوتونا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(أمريكا)" data-id="1002166">جزر ویرجین
       (أمريكا)</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(بريطانيا)" data-id="1002143">جزر ویرجین
       (بريطانيا)</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزیره جوادلوب" data-id="1002151">جزیره جوادلوب</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جمهورية أيرلندا" data-id="1002057">جمهورية أيرلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الجمهورية التشيكية" data-id="1002046">الجمهورية التشيكية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جمهورية الدومينيكان" data-id="1002148">جمهورية الدومينيكان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جيبوتي" data-id="1002092">جيبوتي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تشاد" data-id="1002088">تشاد</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الصين" data-id="1002215">الصين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الدنمارك" data-id="1002047">الدنمارك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="دومینیکا" data-id="1002147">دومینیکا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="رواندا" data-id="1002119">رواندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="روسيا" data-id="1002035">روسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="رومانيا" data-id="1002073">رومانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="زامبيا" data-id="1002104">زامبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اليابان" data-id="1002217">اليابان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سان تومي وبرينسيبي" data-id="1002121">سان تومي وبرينسيبي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ساحل العاج" data-id="1167335">ساحل العاج</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سریلانکا" data-id="1002225">سریلانکا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سان بيير وميكلون" data-id="1002170">سان بيير وميكلون</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت كيتس ونيفيس" data-id="1002161">سانت كيتس ونيفيس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت لوسيا" data-id="1002162">سانت لوسيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت هيلين" data-id="1002120">سانت هيلين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سانت فنسنت وجزر غرينادين" data-id="1002163">سانت فنسنت و
       غرينادين</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سنغافورة" data-id="1002262">سنغافورة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="السنغال" data-id="1002122">السنغال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="السويد" data-id="1002078">السويد</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سويسرا" data-id="1002079">سويسرا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سوازيلاند" data-id="1002128">سوازيلاند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="السودان" data-id="1002127">السودان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سورينام" data-id="1002183">سورينام</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سوريا" data-id="1002246">سوريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الصومال" data-id="1002125">الصومال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سيراليون" data-id="1002124">سيراليون</li><li
       onclick="select_area_val(this)" class="li-item" data-value="سيشيل" data-id="1002123">سيشيل</li><li
       onclick="select_area_val(this)" class="li-item" data-value="شيلي" data-id="1002175">شيلي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="صربيا" data-id="1167332">صربيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="العراق" data-id="1002237">العراق</li><li
       onclick="select_area_val(this)" class="li-item" data-value="المملكة العربية السعودية" data-id="1002245">المملكة العربية السعودية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="عمان" data-id="1002243">عمان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غانا" data-id="1002099">غانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فرنسا" data-id="1002051">فرنسا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فنلندا" data-id="1002050">فنلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فيلبيني" data-id="1002261">فيلبيني</li><li
       onclick="select_area_val(this)" class="li-item" data-value="قبرص" data-id="1002235">قبرص</li><li
       onclick="select_area_val(this)" class="li-item" data-value="قيرغيزستان" data-id="1002231">قيرغيزستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كازاخستان" data-id="1002229">كازاخستان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="قطر" data-id="1002244">قطر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كوستاريكا" data-id="1002145">كوستاريكا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كاليدونيا الجديدة" data-id="1002198">كاليدونيا الجديدة</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كمبوديا" data-id="1002252">كمبوديا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكاميرون" data-id="1002086">الكاميرون</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كندا" data-id="1002168">كندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كوريا الجنوبية" data-id="1002224">كوريا الجنوبية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كرواتيا" data-id="1002045">كرواتيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كولومبيا" data-id="1002184">كولومبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكونغو" data-id="1002090">الكونغو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكونغو، الجمهورية الديمقراطية" data-id="1198851">الكونغو، جمهورية
       الديمقراطية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كينيا" data-id="1002102">كينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="کوبا" data-id="1002146">کوبا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جزر القمر" data-id="1002089">جزر القمر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الكويت" data-id="1002241">الكويت</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الرأس الأخضر" data-id="1002133">الرأس الأخضر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="كيريباتي" data-id="1002192">كيريباتي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غامبيا" data-id="1002098">غامبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جورجيا" data-id="1002228">جورجيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="جرينلاند" data-id="1002136">جرينلاند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غواتيمالا" data-id="1002152">غواتيمالا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غيانا" data-id="1002179">غيانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غينيا" data-id="1002100">غينيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غينيا الاستوائية" data-id="1002094">غينيا الاستوائية</li><li
       onclick="select_area_val(this)" class="li-item" data-value="غينيا بيساو" data-id="1002101">غينيا بيساو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="لاوس" data-id="1002258">لاوس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="لبنان" data-id="1002242">لبنان</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ليسوتو" data-id="1002106">ليسوتو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بولندا" data-id="1002071">بولندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ليبيا" data-id="1002108">ليبيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مدغشقر" data-id="1002109">مدغشقر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مارتينيك" data-id="1002156">مارتينيك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ماكاو" data-id="1002259">ماكاو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ملاوي" data-id="1002110">ملاوي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مالطا" data-id="1002067">مالطا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ماليزيا" data-id="1002260">ماليزيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="تمويل" data-id="1002111">تمويل</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هنغاريا" data-id="1002056">هنغاريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="المغرب" data-id="1002114">المغرب</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مصر" data-id="1002093">مصر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="منغوليا" data-id="1002219">منغوليا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="مقدونيا" data-id="1002066">مقدونيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="المكسيك" data-id="1002169">المكسيك</li><li
       onclick="select_area_val(this)" class="li-item" data-value="موريتانيا" data-id="1002112">موريتانيا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="موريشيوس" data-id="1002134">موريشيوس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="موزمبيق" data-id="1002115">موزمبيق</li><li
       onclick="select_area_val(this)" class="li-item" data-value="ناورو" data-id="1002197">ناورو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيبال" data-id="1002220">نيبال</li><li
       onclick="select_area_val(this)" class="li-item" data-value="النرويج" data-id="1002070">النرويج</li><li
       onclick="select_area_val(this)" class="li-item" data-value="النيجر" data-id="1002117">النيجر</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيجيريا" data-id="1002118">نيجيريا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيكاراغوا" data-id="1002158">نيكاراغوا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="نيوزيلندا" data-id="1002199">نيوزيلندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هايتي" data-id="1002153">هايتي</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هولندا" data-id="1002069">هولندا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="الهند" data-id="1002216">الهند</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هندوراس" data-id="1002154">هندوراس</li><li
       onclick="select_area_val(this)" class="li-item" data-value="هونج كونج" data-id="1002255">هونج كونج</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فانواتو" data-id="1002193">فانواتو</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فنزويلا" data-id="1002185">فنزويلا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="فيتنام" data-id="1002257">فيتنام</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اليمن" data-id="1002240">اليمن</li><li
       onclick="select_area_val(this)" class="li-item" data-value="اليونان" data-id="1002054">اليونان</li>
   </ul></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);


                } else if (element_child_title == 'البرید الإلکتروني') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item unvisible passenger-email`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    element_child.appendChild(label);
                    var string = `<div class="inner-item"><input `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);

                } else if (element_child_title == 'رقم جواز السفر') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item ${internal}`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    element_child.setAttribute("onkeydown", "persian_key(event,this)");
                    var string = `<div class="inner-item"><input value="${internal == 'internal' ? '-' : ''}" onkeyup="this.value=this.value.replace(/[^0-9a-zA-Z]/g, '');" class="passportcode${internal == 'internal' ? '' : ' necessary'}"`;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr
                                .name !== 'class') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);

                } else {

                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    element_child.appendChild(label);
                    var string = `<div class="inner-item"><input `;
                    console.log("ok1")
                    if (element_child_title == 'الاسم الأول باللغة الإنجليزية') {
                        label.setAttribute("data-label", "الاسم");
                        string += `onkeydown="english_key(event,this)" onkeyup="upperCase_key(event,this)"`;
                    }
                    if (element_child_title == 'اللقب باللغة الإنجليزية') {
                        label.setAttribute("data-label", "اللقب");
                        string += `onkeydown="english_key(event,this)" onkeyup="upperCase_key(event,this)"`;
                    }

                    if (element_child_title == 'رقم الهویة الوطنية') {
                        label.setAttribute("data-label", element_child_title);
                        string +=
                            `onkeyup="this.value=this.value.replace(/[^0-9]/g, '');" onkeydown="persian_key(event,this)"`;
                    }
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);
                }


            }


        };
        if (document.querySelector(".main-container").getAttribute("data-schemaid") == 290 || document.querySelector(".main-container").getAttribute("data-schemaid") == 291 || document.querySelector(".main-container").getAttribute("data-schemaid") == 292) {
            //<!------START CHECK EXTERA SERVICES------->// 
            if (document.querySelector(".extra_service")) {
                if(element.querySelector(".passenger-type").value !== '0'){
                var element_child = document.createElement("div");
                element_child.className = "package-info-item section_extra_service";
                var string =
                    `<div class="extra_service_container"><label data-label="خدمات الشحن">خدمات الشحن </label><input onchange="load_extra_service(this,'flight')" class="extra_service_checkbox" type="checkbox" value="-"/><span class="mini-loading unvisible"><i class="fas fa-spinner fa-spin"></i></span></div><div class="extra_services"></div>`
                element_child.innerHTML += string;
                element_children.appendChild(element_child);
                }
            }
            //<!------END CHECK EXTERA SERVICES------->// 
        };
        if (document.querySelector(".main-container").getAttribute("data-schemaid") == 500) {
            //<!------START CIP FACILITY------->// 
            var element_child = document.createElement("div");
            element_child.className = "wheelchair-container";
            var string = "";
            if (document.querySelector(".sid_wheelchair")) {
                string += `<input type="checkbox" value="0"  onchange="check_wheelchair(this)"/><input type="hidden" value="0" class="check_wheelchair" name="_root.passengerinfo__${i}.passengerinfo.wheelchair"/><label>صندلی چرخ دار</label>`
            } else {
                string += `<input type="hidden" value="0" name="_root.passengerinfo__${i}.passengerinfo.wheelchair"/>`;
            }

            element_child.innerHTML += string;
            element_children.appendChild(element_child);
            //<!------END CIP FACILITY------->// 
        };
        if (document.querySelector(".main-container").getAttribute("data-schemaid") == 401 || document.querySelector(".main-container").getAttribute("data-schemaid") == 402) {
            //<!------START CHECK EXTERA SERVICES------->// 
            if (document.querySelector(".extra_service")) {
                var element_child = document.createElement("div");
                element_child.className = "package-info-item section_extra_service";
                var string =
                    `<div class="extra_service_container"><label data-label="خدمات قطار">خدمات قطار </label><input onchange="load_extra_service(this,'train')" class="extra_service_checkbox" type="checkbox" value="-"/><span class="mini-loading unvisible"><i class="fas fa-spinner fa-spin"></i></span></div><div class="extra_services train"></div>`
                element_child.innerHTML += string;
                element_children.appendChild(element_child);
            }
            //<!------END CHECK EXTERA SERVICES------->// 
        };
        var element_clr = document.createElement("div");
        element_clr.className = "clr";
        element_children.appendChild(element_clr);
        element.appendChild(element_children);
        document.querySelector(".passengers-info-content").appendChild(element);
    };
    create_array_data('no-room');
} else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 251 || document.querySelector(".main-container").getAttribute("data-schemaid") == 290251 || document.querySelector(".main-container").getAttribute("data-schemaid") == 249) {
    for (var i = 0; i < schema.length; i++) {
        let room;
        var internal = "external";
        if (document.querySelector(".internal").value == 1) {
            internal = "internal"
        };
        switch (i) {
            case 0:
                room = "1";
                break;
            case 1:
                room = "2";
                break;
            case 2:
                room = "3";
                break;
            case 3:
                room = "4";
                break;
        };

        var element = document.createElement("div");
        element.className = "passenger-info-content box-content";
        element.setAttribute("data-index", i);
        var element_title = document.createElement("div");
        element_title.className = "title font_14 font-weight room-title";
        element_title.innerHTML = `<span>غرفة ${room}</span>`;
        element.appendChild(element_title);
        for (var s = 0; s < schema[i].room.length; s++) {
            var element_room = document.createElement("div");
            element_room.className = "passenger";
            element_room.setAttribute("data-index", s);
            var element_title = document.createElement("div");
            element_title.className = "title flex-justify font_14";
            element_title.innerHTML =
                `<div class="type-passenger font-weight">${schema[i].room[s].title}</div><div class="prev-passengers" data-open="0" data-index-room="${i}" data-index="${s}" onclick="show_passengersList(this)"><svg data-v-2919ee3e="" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" name="user-clock" color="inherit" type="regular" class="mr-icon-svg svg-inline--fa fa-user-clock"><path data-v-2919ee3e="" fill="" d="M496 224c-79.63 0-144 64.38-144 144s64.38 144 144 144s144-64.38 144-144S575.6 224 496 224zM544 384h-54.25C484.4 384 480 379.6 480 374.3V304c0-8.836 7.164-16 16-16c8.838 0 16 7.164 16 16v48h32c8.838 0 16 7.164 16 15.1S552.8 384 544 384zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48zM395 512H32c-17.67 0-32-14.33-32-32c0-97.2 78.8-176 176-176h96c19.87 0 38.89 3.441 56.7 9.508c-4.963 15.24-7.787 31.41-8.383 48.17C305.4 355.5 289.1 352 272 352h-96c-65.16 0-119.1 48.95-127 112h299.6C360.9 482.8 376.6 499.1 395 512z" class=""></path></svg>قائمة المسافرين السابقين</div>`;
            element_room.appendChild(element_title);
            var element_children = document.createElement("div");
            element_children.className = "passenger-info-items";
            for (var j = 0; j < schema[i].room[s].form.length; j++) {
                var type = schema[i].room[s].form[j].type;
                if (type == 132) {
                    var element_child_title = schema[i].room[s].form[j].question;
                    var element_child = document.createElement("div");
                    element_child.className = "package-info-item unvisible passenger-mobile";
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    element_child.appendChild(label);
                    var string = `<div>`;
                    for (var y = 0; y < schema[i].room[s].form[j].inputs.length; y++) {
                        string += `<div class="inner-item"><input `;
                        for (var x = 0; x < schema[i].room[s].form[j].inputs[y].attrs.length; x++) {
                            string += schema[i].room[s].form[j].inputs[y].attrs[x].attr.name + '="' + schema[i].room[s].form[j]
                                .inputs[y].attrs[x].attr.value + '" ';
                        };
                        string += `/></div>`;
                    };
                    string += `</div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);
                } else if (type == 140) {
                    var element_child_title = schema[i].room[s].form[j].question;
                    var element_child = document.createElement("div");
                    element_child.className = "package-info-item has-select-input";
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    var string = `<div class="inner-item"><input class="gender necessary" type="text" onclick="toggle_gender(this)" onkeyup="tab_key(event,this)" readonly="true"/><input class="gender-id" type="hidden"  `;
                    for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                        if (schema[i].room[s].form[j].attrs[y].attr.name !== 'id' && schema[i].room[s].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].room[s].form[j].attrs[y].attr.name !== 'class' && schema[i].room[s].form[j].attrs[y].attr.name !== 'type') {
                            string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[y]
                                .attr
                                .value + '" ';
                        }

                    };
                    string += `/></div><ul class='drop-item wide'>`;
                    for (var x = 0; x < schema[i].room[s].form[j].values.length; x++) {
                        string +=
                            `<li onclick="select_gender_val(this)" class="li-item" data-value="${schema[i].room[s].form[j].values[x].value.value}">${schema[i].room[s].form[j].values[x].value.title}</li>`
                    };
                    string += `</ul>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);
                } else {
                    var element_child_title = schema[i].room[s].form[j].question;
                    if (element_child_title == 'الاسم') {
                        element_child_title = 'الاسم الأول باللغة الإنجليزية';

                    } else if (element_child_title == 'اللقب') {
                        element_child_title = 'اللقب باللغة الإنجليزية';
                    } else if (element_child_title == 'رقم جواز السفر ') {
                        element_child_title = 'رقم جواز السفر';
                    } else if (element_child_title == 'انتهاء صلاحية جواز السفر') {
                        element_child_title = 'انتهاء صلاحية جواز السفر';
                    } else if (element_child_title == 'بلد إصدار جواز السفر') {
                        element_child_title = 'بلد إصدار جواز السفر';
                    } else if (element_child_title == 'تاریخ الولادة') {
                        element_child_title = `${internal == 'internal' ? 'تاریخ الولادة' : 'تاريخ الميلاد'}`;
                    };

                    if (element_child_title == 'تاريخ الميلاد' || element_child_title == 'تاریخ الولادة') {
                        var element_child = document.createElement("div");
                        element_child.className = "package-info-item";
                        var label = document.createElement("label");
                        label.innerHTML = element_child_title;
                        label.setAttribute("data-label", "تاریخ الولادة");
                        element_child.appendChild(label);
                        var string = `<div class="passenger-date-items${internal == 'internal' ? ' internal' : ''}"><div class="passenger-date-item has-select"
                                                               >
                                                               <div class="inner-item"><input maxlength="2" type="text"  onclick="toggle_date(this,'day')" placeholder="يوم" class="day necessary" oninput="autoComplete_search(event,this,'day')"  onblur="autoFill_search(event,this,'passenger-date-item')"  onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                               <ul class="drop-item">
                                                                   <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="1">1</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="2">2</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="3">3</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="4">4</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="5">5</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="6">6</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="7">7</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="8">8</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="9">9</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="10">10</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="11">11</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="12">12</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="13" data-value="13">13</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="14" data-value="14">14</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="15" data-value="15">15</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="16" data-value="16">16</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="17" data-value="17">17</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="18" data-value="18">18</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="19" data-value="19">19</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="20" data-value="20">20</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="21" data-value="21">21</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="22" data-value="22">22</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="23" data-value="23">23</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="24" data-value="24">24</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="25" data-value="25">25</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="26" data-value="26">26</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="27" data-value="27">27</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="28" data-value="28">28</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="29" data-value="29">29</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="30" data-value="30">30</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="31" data-value="31">31</li>
                                                     
                                                               </ul>
       
                                                           </div>
                                                           <div class="passenger-date-item has-select"
                                                              >
                                                              <div class="inner-item"><input type="text"  maxlength="2" onclick="toggle_date(this,'month')"  placeholder="شهر" class="month necessary" oninput="autoComplete_search(event,this,'month')" onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="tab_key(event,this);"  data-id=""/></div>
                                                              <ul class="drop-item">
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="01" data-switch="January" data-default="January" data-value="January" >
                                                              January
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="02" data-switch="February" data-default="February" data-value="February">
                                                              February
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="03" data-switch="March" data-default="March" data-value="March">March
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="04" data-switch="April" data-default="April" data-value="April">April
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="05" data-switch="May" data-default="May" data-value="May">May
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="06" data-switch="June" data-default="June" data-value="June">June
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="07" data-switch="July" data-default="July" data-value="July">July
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="08" data-switch="August" data-default="August" data-value="August">
                                                              August</li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="09" data-switch="September" data-default="September" data-value="September">
                                                              September
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="10" data-switch="October" data-default="October" data-value="October">
                                                              October
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="11" data-switch="November" data-default="November" data-value="November">
                                                              November
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-id="12" data-switch="December" data-default="December" data-value="December">
                                                              December
                                                              </li>
                                                              </ul>
                                                           </div>
                                                           <div class="passenger-date-item has-select"
                                                               >
                                                               <div class="inner-item"><input type="text" maxlength="4" onclick="toggle_date(this,'year-birthdate')" placeholder="سنة" class="year necessary" oninput="autoComplete_search(event,this,'year-birthdate')"  onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                               <ul class="drop-item">
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2024" data-default="2024" data-id="2024" data-value="2024">2024</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2023" data-default="2023" data-id="2023" data-value="2023">2023</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2022" data-default="2022" data-id="2022" data-value="2022">2022</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2021" data-default="2021" data-id="2021" data-value="2021">2021</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2020" data-default="2020" data-id="2020" data-value="2020">2020</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2019" data-default="2019" data-id="2019" data-value="2019">2019</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2018" data-default="2018" data-id="2018" data-value="2018">2018</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2017" data-default="2017" data-id="2017" data-value="2017">2017</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2016" data-default="2016" data-id="2016" data-value="2016">2016</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2015" data-default="2015" data-id="2015" data-value="2015">2015</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2014" data-default="2014" data-id="2014" data-value="2014">2014</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2013" data-default="2013" data-id="2013" data-value="2013">2013</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2012" data-default="2012" data-id="2012" data-value="2012">2012</li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2011" data-default="2011" data-id="2011" data-value="2011">2011
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2010" data-default="2010" data-id="2010" data-value="2010">2010
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2009" data-default="2009" data-id="2009" data-value="2009">2009
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2008" data-default="2008" data-id="2008" data-value="2008">2008
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2007" data-default="2007" data-id="2007" data-value="2007">2007
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2006" data-default="2006" data-id="2006" data-value="2006">2006
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2005" data-default="2005" data-id="2005" data-value="2005">2005
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2004" data-default="2004" data-id="2004" data-value="2004">2004
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2003" data-default="2003" data-id="2003" data-value="2003">2003
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2002" data-default="2002" data-id="2002" data-value="2002">2002
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2001" data-default="2001" data-id="2001" data-value="2001">2001
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="2000" data-default="2000" data-id="2000" data-value="2000">2000
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1999" data-default="1999" data-id="1999" data-value="1999">1999
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1998" data-default="1998" data-id="1998" data-value="1998">1998
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1997" data-default="1997" data-id="1997" data-value="1997">1997
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1996" data-default="1996" data-id="1996" data-value="1996">1996
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1995" data-default="1995" data-id="1995" data-value="1995">1995
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1994" data-default="1994" data-id="1994" data-value="1994">1994
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1993" data-default="1993" data-id="1993" data-value="1993">1993
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1992" data-default="1992" data-id="1992" data-value="1992">1992
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1991" data-default="1991" data-id="1991" data-value="1991">1991
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1990" data-default="1990" data-id="1990" data-value="1990">1990
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1989" data-default="1989" data-id="1989" data-value="1989">1989
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1988" data-default="1988" data-id="1988" data-value="1988">1988
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1987" data-default="1987" data-id="1987" data-value="1987">1987
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1986" data-default="1986" data-id="1986" data-value="1986">1986
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1985" data-default="1985" data-id="1985" data-value="1985">1985
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1984" data-default="1984" data-id="1984" data-value="1984">1984
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1983" data-default="1983" data-id="1983" data-value="1983">1983
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1982" data-default="1982" data-id="1982" data-value="1982">1982
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1981" data-default="1981" data-id="1981" data-value="1981">1981
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1980" data-default="1980" data-id="1980" data-value="1980">1980
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1979" data-default="1979" data-id="1979" data-value="1979">1979
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1978" data-default="1978" data-id="1978" data-value="1978"> 1978
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1977" data-default="1977" data-id="1977" data-value="1977">1977
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1976" data-default="1976" data-id="1976" data-value="1976">1976
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1975" data-default="1975" data-id="1975" data-value="1975">1975
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1974" data-default="1974" data-id="1974" data-value="1974">1974
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1973" data-default="1973" data-id="1973" data-value="1973">1973
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1972" data-default="1972" data-id="1972" data-value="1972"> 1972
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1971" data-default="1971" data-id="1971" data-value="1971">1971
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1970" data-default="1970" data-id="1970" data-value="1970">1970
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1969" data-default="1969" data-id="1969" data-value="1969">1969
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1968" data-default="1968" data-id="1968" data-value="1968">1968
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1967" data-default="1967" data-id="1967" data-value="1967">1967
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1966" data-default="1966" data-id="1966" data-value="1966">1966
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1965" data-default="1965" data-id="1965" data-value="1965"> 1965
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1964" data-default="1964" data-id="1964" data-value="1964">1964
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1963" data-default="1963" data-id="1963" data-value="1963">1963
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1962" data-default="1962" data-id="1962" data-value="1962">1962
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1961" data-default="1961" data-id="1961" data-value="1961">1961
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1960" data-default="1960" data-id="1960" data-value="1960">1960
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1959" data-default="1959" data-id="1959" data-value="1959">1959
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1958" data-default="1958" data-id="1958" data-value="1958">1958
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1957" data-default="1957" data-id="1957" data-value="1957">1957
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1956" data-default="1956" data-id="1956" data-value="1956">1956
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1955" data-default="1955" data-id="1955" data-value="1955">1955
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1954" data-default="1954" data-id="1954" data-value="1954">1954
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1953" data-default="1953" data-id="1953" data-value="1953">1953
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1952" data-default="1952" data-id="1952" data-value="1952">1952
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1951" data-default="1951" data-id="1951" data-value="1951">1951
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1950" data-default="1950" data-id="1950" data-value="1950">1950
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="$1949" data-default="1949" data-id="1949" data-value="1949">1949
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1948" data-default="1948" data-id="1948" data-value="1948">1948
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1947" data-default="1947" data-id="1947" data-value="1947">1947
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1946" data-default="1946" data-id="1946" data-value="1946">1946
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1945" data-default="1945" data-id="1945" data-value="1945">1945
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1944" data-default="1944" data-id="1944" data-value="1944">1944
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1943" data-default="1943" data-id="1943" data-value="1943">1943
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1942" data-default="1942" data-id="1942" data-value="1942">1942
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="$1941" data-default="1941" data-id="1941" data-value="1941">1941
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1940" data-default="1940" data-id="1940" data-value="1940">1940
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1939" data-default="1939" data-id="1939" data-value="1939">1939
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1938" data-default="1938" data-id="1938" data-value="1938">1938
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1937" data-default="1937" data-id="1937" data-value="1937">1937
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1936" data-default="1936" data-id="1936" data-value="1936">1936
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1935" data-default="1935" data-id="1935" data-value="1935">1935
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1934" data-default="1934" data-id="1934" data-value="1934">1934
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1933" data-default="1933" data-id="1933" data-value="1933">1933
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1932" data-default="1932" data-id="1932" data-value="1932">1932
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1931" data-default="1931" data-id="1931" data-value="1931">1931
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1930" data-default="1930" data-id="1930" data-value="1930">1930
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1929" data-default="1929" data-id="1929" data-value="1929">1929
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1928" data-default="1928" data-id="1928" data-value="1928">1928
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1927" data-default="1927" data-id="1927" data-value="1927">1927
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1926" data-default="1926" data-id="1926" data-value="1926"> 1926
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1925" data-default="1925" data-id="1925" data-value="1925"> 1925
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1924" data-default="1924" data-id="1924" data-value="1924">1924
                                                               </li>
                                                               <li onclick="select_date_val(this)" class="li-item" data-switch="1923" data-default="1923" data-id="1923" data-value="1923">1923
                                                               </li>
                                                           </div><input type="hidden" `;
                        for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                            if (schema[i].room[s].form[j].attrs[y].attr.name !== 'id' && schema[i].room[s].form[j].attrs[y].attr
                                .name !== 'placeholder' && schema[i].room[s].form[j].attrs[y].attr.name !== 'type') {
                                string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[
                                    y].attr.value + '" ';
                            }
                        };
                        string += `/></div>`;
                        element_child.innerHTML += string;
                        element_children.appendChild(element_child);

                    } else if (element_child_title == 'انتهاء صلاحية جواز السفر') {
                        var element_child = document.createElement("div");
                        element_child.className = `package-info-item ${internal}`;
                        var label = document.createElement("label");
                        label.innerHTML = element_child_title;
                        label.setAttribute("data-label", element_child_title);
                        element_child.appendChild(label);

                        var string = `<div class="passenger-date-items${internal == 'internal' ? ' internal' : ''}"> <div class="passenger-date-item has-select"
                                                              >
                                                              <div class="inner-item"><input maxlength="2" type="text"  onclick="toggle_date(this,'day')" placeholder="يوم" class="day${internal == 'internal' ? '' : ' necessary'}" oninput="autoComplete_search(event,this,'day')" onblur="autoFill_search(event,this,'passenger-date-item')"  onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                               <ul class="drop-item">
                                                                   <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="1">1</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="2">2</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="3">3</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="4">4</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="5">5</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="6">6</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="7">7</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="8">8</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="9">9</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="10">10</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="11">11</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="12">12</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="13" data-value="13">13</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="14" data-value="14">14</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="15" data-value="15">15</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="16" data-value="16">16</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="17" data-value="17">17</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="18" data-value="18">18</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="19" data-value="19">19</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="20" data-value="20">20</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="21" data-value="21">21</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="22" data-value="22">22</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="23" data-value="23">23</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="24" data-value="24">24</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="25" data-value="25">25</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="26" data-value="26">26</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="27" data-value="27">27</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="28" data-value="28">28</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="29" data-value="29">29</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="30" data-value="30">30</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="31" data-value="31">31</li>
                                                               </ul>
       
                                                           </div>
                                                           <div class="passenger-date-item has-select"
                                                             >
                                                             <div class="inner-item"><input maxlength="2" type="text"  onclick="toggle_date(this,'month')" placeholder="شهر" class="month${internal == 'internal' ? '' : ' necessary'}"   oninput="autoComplete_search(event,this,'month')"  onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="tab_key(event,this);" data-id=""/></div>
                                                             <ul class="drop-item">
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="01" data-switch="January" data-default="January" data-value="January" >
                                                             January
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="02" data-switch="February" data-default="February" data-value="February">
                                                             February
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="03" data-switch="March" data-default="March" data-value="March">March
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="04" data-switch="April" data-default="April" data-value="April">April
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="05" data-switch="May" data-default="May" data-value="May">May
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="06" data-switch="June" data-default="June" data-value="June">June
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="07" data-switch="July" data-default="July" data-value="July">July
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="08" data-switch="August" data-default="August" data-value="August">
                                                             August</li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="09" data-switch="September" data-default="September" data-value="September">
                                                             September
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="10" data-switch="October" data-default="October" data-value="October">
                                                             October
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="11" data-switch="November" data-default="November" data-value="November">
                                                             November
                                                             </li>
                                                             <li onclick="select_date_val(this)" class="li-item" data-id="12" data-switch="December" data-default="December" data-value="December">
                                                             December
                                                             </li>
                                                             </ul>
                                                           </div>
                                                           <div class="passenger-date-item has-select"
                                                              >
                                                              <div class="inner-item"><input maxlength="4" type="text"  onclick="toggle_date(this,'year-passport')"  placeholder="سنة" class="year${internal == 'internal' ? '' : ' necessary'}" oninput="autoComplete_search(event,this,'year-passport')"  onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                              <ul class="drop-item">
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2024" data-default="2024" data-id="2024" data-value="2024">2024
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2025" data-default="2025" data-id="2025" data-value="2025">2025
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2026" data-default="2026" data-id="2026" data-value="2026">2026
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2027" data-default="2027" data-id="2027" data-value="2027">2027
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2028" data-default="2028" data-id="2028" data-value="2028">2028
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2029" data-default="2029" data-id="2029" data-value="2029">2029
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2030" data-default="2030" data-id="2030" data-value="2030">2030
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2031" data-default="2031" data-id="2031" data-value="2031">2031
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2032" data-default="2032" data-id="2032" data-value="2032">2032
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2033" data-default="2033" data-id="2033" data-value="2033">2033
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2034" data-default="2034" data-id="2034" data-value="2034">2034
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2035" data-default="2035" data-id="2035" data-value="2035">2035
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2036" data-default="2036" data-id="2036" data-value="2036">2036
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2037" data-default="2037" data-id="2037" data-value="2037">2037
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="$2038" data-default="2038" data-id="2038" data-value="2038">2038
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2039" data-default="2039" data-id="2039" data-value="2039">2039
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2040" data-default="2040" data-id="2040" data-value="2040">2040
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2041" data-default="2041" data-id="2041" data-value="2041">2041
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2042" data-default="2042" data-id="2042" data-value="2042">2042
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2043" data-default="2043" data-id="2043" data-value="2043">2043
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="$2044" data-default="2044" data-id="2044" data-value="2044">2044
                                                              </li>
                                                              <li onclick="select_date_val(this)" class="li-item" data-switch="2045" data-default="2045" data-id="2045" data-value="2045">2045
                                                              </li>
                                                              </ul>
                                                           </div><input type="hidden" value="${internal == 'internal' ? '-' : ''}" class="datepicker passexpiredate"`;
                        for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                            if (schema[i].room[s].form[j].attrs[y].attr.name !== 'id' && schema[i].room[s].form[j].attrs[y].attr
                                .name !== 'placeholder' && schema[i].room[s].form[j].attrs[y].attr.name !== 'type' && schema[i].room[s].form[j].attrs[y].attr.name !== 'class') {
                                string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[
                                    y].attr.value + '" ';
                            }
                        };
                        string += `/></div>`;
                        element_child.innerHTML += string;
                        element_children.appendChild(element_child);
                    } else if (element_child_title == 'الجنسية') {
                        var element_child = document.createElement("div");
                        element_child.className = `package-info-item has-select-input`;
                        var label = document.createElement("label");
                        label.innerHTML = element_child_title;
                        label.setAttribute("data-label", element_child_title);
                        element_child.appendChild(label);
                        var input_name = "";
                        var string = `<div class="inner-item"><input value="ایران" data-value="ایران" oninput="autoComplete_search(event,this,'area')" onblur="autoFill_search(event,this,'package-info-item')" onkeyup="tab_key(event,this);" onclick="toggle_area(this)"  `;
                        for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                            if (schema[i].room[s].form[j].attrs[y].attr.name !== 'id' && schema[i].room[s].form[j].attrs[y].attr
                                .name !== 'placeholder' && schema[i].room[s].form[j].attrs[y].attr.name !== 'name') {
                                string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[
                                    y].attr.value + '" ';
                            }
                            if (schema[i].room[s].form[j].attrs[y].attr.name == 'name') {
                                input_name = schema[i].room[s].form[j].attrs[y].attr.value;
                            }
                        };
                        string += `/></div><input type="hidden" value="1002236" name="${input_name}" class="area-id issuecountry"/><ul class="drop-item wide">
                                   <li onclick="select_area_val(this)" class="li-item" data-value="ایران" data-id="1002236">ایران</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="أذربيجان" data-id="1002227">أذربيجان</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="الأرجنتين" data-id="1002172">الأرجنتين</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="آروبا" data-id="1002139">آروبا</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="جنوب أفريقيا" data-id="1002126">جنوب أفريقيا</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="أفريقيا الوسطى" data-id="1002087">أفريقيا الوسطى</li>
       <li
           onclick="select_area_val(this)" class="li-item" data-value="ألبانيا"
           data-id="1002040">ألبانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="ألمانيا"
           data-id="1002052">ألمانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="أنتيغوا وبربودا"
           data-id="1002138">أنتيغوا وبربودا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أندورا" data-id="1002041">أندورا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أنغولا" data-id="1002081">أنغولا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أنغيلا" data-id="1002137">أنغيلا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اتریش" data-id="1002042">اتریش</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أثيوبيا" data-id="1002096">أثيوبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الأردن" data-id="1002239">الأردن</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أرمينيا" data-id="1002226">أرمينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوروغواي" data-id="1002180">أوروغواي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="إريتريا" data-id="1002095">إريتريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوزبكستان" data-id="1002230">أوزبكستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="إسبانيا" data-id="1002077">إسبانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أستراليا" data-id="1002187">أستراليا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="إستونيا" data-id="1002048">إستونيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سلوفاكيا" data-id="1002075">سلوفاكيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سلوفينيا" data-id="1002076">سلوفينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أفغانستان" data-id="1002212">أفغانستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الاكوادور" data-id="1002176">الاكوادور</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الجزائر" data-id="1002080">الجزائر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سلفادور" data-id="1002149">سلفادور</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الإمارات العربية المتحدة" data-id="1002248">الإمارات العربية المتحدة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أندونيسيا" data-id="1002256">أندونيسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="انجلترا" data-id="1167330">انجلترا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوكرانيا" data-id="1002039">أوكرانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوغندا" data-id="1002132">أوغندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ولايات ميكرونيزيا الموحدة" data-id="1002196">ولايات ميكرونيزيا الموحدة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ایالات متحده" data-id="1002211">ایالات متحده</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الولايات المتحدة الجزر الهامشية" data-id="1198858">الولايات المتحدة الجزر الهامشية</li><li onclick="select_area_val(this)" class="li-item" data-value="ایتالیا" data-id="1002059">ایتالیا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أيسلندا" data-id="1002034">أيسلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بربادوس" data-id="1002141">بربادوس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر البهاما" data-id="1002140">جزر البهاما</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البحرين" data-id="1002234">البحرين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البرازيل" data-id="1002174">البرازيل</li><li
           onclick="select_area_val(this)" class="li-item" data-value="برمودا" data-id="1002167">برمودا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بروناي" data-id="1002250">بروناي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بيلاروسيا" data-id="1002037">بيلاروسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بلجيكا" data-id="1002043">بلجيكا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بلغاريا" data-id="1002044">بلغاريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بليز" data-id="1002142">بليز</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بنغلاديش" data-id="1002213">بنغلاديش</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بنين" data-id="1002082">بنين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بوتسوانا" data-id="1002083">بوتسوانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورما" data-id="1002251">بورما</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البوسنة والهرسك" data-id="1002036">البوسنة والهرسك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بوليفيا" data-id="1002173">بوليفيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مملكة بوتان" data-id="1002214">مملكة بوتان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="باراجواي" data-id="1002181">باراجواي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="باكستان" data-id="1002222">باكستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بالاو" data-id="1002203">بالاو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بنما" data-id="1002159">بنما</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البرتغال" data-id="1002072">البرتغال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بيرو" data-id="1002182">بيرو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بولينيزيا الفرنسية" data-id="1002190">بولينيزيا الفرنسية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بورتوريكو" data-id="1002160">بورتوريكو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="طاجيكستان" data-id="1002232">طاجيكستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تنزانيا" data-id="1002129">تنزانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تايلاند" data-id="1002264">تايلاند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تايوان" data-id="1002263">تايوان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تركمانستان" data-id="1002233">تركمانستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تركيا" data-id="1002247">تركيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ترينيداد وتوباغو" data-id="1002164">ترينيداد وتوباغو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="توغو" data-id="1002130">توغو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تونس" data-id="1002131">تونس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تونغا" data-id="1002209">تونغا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="توفالو" data-id="1002210">توفالو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تيمور الشرقية" data-id="1193762">تيمور الشرقية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جامايكا" data-id="1002155">جامايكا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جبل طارق" data-id="1002053">جبل طارق</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر سليمان" data-id="1002207">جزر سليمان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر فوكلاند (مالفيناس)" data-id="1002177">جزر فوكلاند
           (مالفيناس)</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر فيجي" data-id="1002189">جزر
           فيجي</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر كوك" data-id="1002188">جزر
           كوك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر كايمان" data-id="1002144">جزر كايمان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر مارشال" data-id="1002195">جزر مارشال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر ماريانا الشمالية" data-id="1002202">جزر ماريانا
           الشمالية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر والیس و فوتونا" data-id="1002194">جزر والیس و
           فوتونا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(أمريكا)" data-id="1002166">جزر ویرجین
           (أمريكا)</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(بريطانيا)" data-id="1002143">جزر ویرجین
           (بريطانيا)</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزیره جوادلوب" data-id="1002151">جزیره جوادلوب</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جمهورية أيرلندا" data-id="1002057">جمهورية أيرلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الجمهورية التشيكية" data-id="1002046">الجمهورية التشيكية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جمهورية الدومينيكان" data-id="1002148">جمهورية الدومينيكان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جيبوتي" data-id="1002092">جيبوتي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تشاد" data-id="1002088">تشاد</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الصين" data-id="1002215">الصين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الدنمارك" data-id="1002047">الدنمارك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="دومینیکا" data-id="1002147">دومینیکا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="رواندا" data-id="1002119">رواندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="روسيا" data-id="1002035">روسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="رومانيا" data-id="1002073">رومانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="زامبيا" data-id="1002104">زامبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اليابان" data-id="1002217">اليابان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سان تومي وبرينسيبي" data-id="1002121">سان تومي وبرينسيبي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ساحل العاج" data-id="1167335">ساحل العاج</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سریلانکا" data-id="1002225">سریلانکا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سان بيير وميكلون" data-id="1002170">سان بيير وميكلون</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت كيتس ونيفيس" data-id="1002161">سانت كيتس ونيفيس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت لوسيا" data-id="1002162">سانت لوسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت هيلين" data-id="1002120">سانت هيلين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت فنسنت وجزر غرينادين" data-id="1002163">سانت فنسنت و
           غرينادين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سنغافورة" data-id="1002262">سنغافورة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="السنغال" data-id="1002122">السنغال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="السويد" data-id="1002078">السويد</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سويسرا" data-id="1002079">سويسرا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سوازيلاند" data-id="1002128">سوازيلاند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="السودان" data-id="1002127">السودان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سورينام" data-id="1002183">سورينام</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سوريا" data-id="1002246">سوريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الصومال" data-id="1002125">الصومال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سيراليون" data-id="1002124">سيراليون</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سيشيل" data-id="1002123">سيشيل</li><li
           onclick="select_area_val(this)" class="li-item" data-value="شيلي" data-id="1002175">شيلي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="صربيا" data-id="1167332">صربيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="العراق" data-id="1002237">العراق</li><li
           onclick="select_area_val(this)" class="li-item" data-value="المملكة العربية السعودية" data-id="1002245">المملكة العربية السعودية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="عمان" data-id="1002243">عمان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غانا" data-id="1002099">غانا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فرنسا" data-id="1002051">فرنسا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فنلندا" data-id="1002050">فنلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فيلبيني" data-id="1002261">فيلبيني</li><li
           onclick="select_area_val(this)" class="li-item" data-value="قبرص" data-id="1002235">قبرص</li><li
           onclick="select_area_val(this)" class="li-item" data-value="قيرغيزستان" data-id="1002231">قيرغيزستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كازاخستان" data-id="1002229">كازاخستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="قطر" data-id="1002244">قطر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كوستاريكا" data-id="1002145">كوستاريكا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كاليدونيا الجديدة" data-id="1002198">كاليدونيا الجديدة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كمبوديا" data-id="1002252">كمبوديا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكاميرون" data-id="1002086">الكاميرون</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كندا" data-id="1002168">كندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كوريا الجنوبية" data-id="1002224">كوريا الجنوبية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كرواتيا" data-id="1002045">كرواتيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كولومبيا" data-id="1002184">كولومبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكونغو" data-id="1002090">الكونغو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكونغو، الجمهورية الديمقراطية" data-id="1198851">الكونغو، جمهورية
           الديمقراطية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كينيا" data-id="1002102">كينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="کوبا" data-id="1002146">کوبا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر القمر" data-id="1002089">جزر القمر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكويت" data-id="1002241">الكويت</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الرأس الأخضر" data-id="1002133">الرأس الأخضر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كيريباتي" data-id="1002192">كيريباتي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غامبيا" data-id="1002098">غامبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جورجيا" data-id="1002228">جورجيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جرينلاند" data-id="1002136">جرينلاند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غواتيمالا" data-id="1002152">غواتيمالا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غيانا" data-id="1002179">غيانا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غينيا" data-id="1002100">غينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غينيا الاستوائية" data-id="1002094">غينيا الاستوائية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غينيا بيساو" data-id="1002101">غينيا بيساو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="لاوس" data-id="1002258">لاوس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="لبنان" data-id="1002242">لبنان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ليسوتو" data-id="1002106">ليسوتو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بولندا" data-id="1002071">بولندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ليبيا" data-id="1002108">ليبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مدغشقر" data-id="1002109">مدغشقر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مارتينيك" data-id="1002156">مارتينيك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ماكاو" data-id="1002259">ماكاو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ملاوي" data-id="1002110">ملاوي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مالطا" data-id="1002067">مالطا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ماليزيا" data-id="1002260">ماليزيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تمويل" data-id="1002111">تمويل</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هنغاريا" data-id="1002056">هنغاريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="المغرب" data-id="1002114">المغرب</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مصر" data-id="1002093">مصر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="منغوليا" data-id="1002219">منغوليا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مقدونيا" data-id="1002066">مقدونيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="المكسيك" data-id="1002169">المكسيك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="موريتانيا" data-id="1002112">موريتانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="موريشيوس" data-id="1002134">موريشيوس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="موزمبيق" data-id="1002115">موزمبيق</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ناورو" data-id="1002197">ناورو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيبال" data-id="1002220">نيبال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="النرويج" data-id="1002070">النرويج</li><li
           onclick="select_area_val(this)" class="li-item" data-value="النيجر" data-id="1002117">النيجر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيجيريا" data-id="1002118">نيجيريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيكاراغوا" data-id="1002158">نيكاراغوا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيوزيلندا" data-id="1002199">نيوزيلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هايتي" data-id="1002153">هايتي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هولندا" data-id="1002069">هولندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الهند" data-id="1002216">الهند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هندوراس" data-id="1002154">هندوراس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هونج كونج" data-id="1002255">هونج كونج</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فانواتو" data-id="1002193">فانواتو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فنزويلا" data-id="1002185">فنزويلا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فيتنام" data-id="1002257">فيتنام</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اليمن" data-id="1002240">اليمن</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اليونان" data-id="1002054">اليونان</li>
       </ul></div>`;
                        element_child.innerHTML += string;
                        element_children.appendChild(element_child);

                    } else if (element_child_title == 'بلد الإقامة') {
                        var element_child = document.createElement("div");
                        element_child.className = `package-info-item has-select-input ${internal}`;
                        var label = document.createElement("label");
                        label.innerHTML = element_child_title;
                        label.setAttribute("data-label", element_child_title);
                        element_child.appendChild(label);
                        var input_name = "";
                        var string = `<div class="inner-item"><input value="ایران" data-value="ایران" oninput="autoComplete_search(event,this,'area')" onblur="autoFill_search(event,this,'package-info-item')" onkeyup="tab_key(event,this)" onclick="toggle_area(this)" `;
                        for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                            if (schema[i].room[s].form[j].attrs[y].attr.name !== 'id' && schema[i].room[s].form[j].attrs[y].attr
                                .name !== 'placeholder' && schema[i].room[s].form[j].attrs[y].attr.name !== 'name') {
                                string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[
                                    y].attr.value + '" ';
                            }
                            if (schema[i].room[s].form[j].attrs[y].attr.name == 'name') {
                                input_name = schema[i].room[s].form[j].attrs[y].attr.value;
                            }
                        };
                        string += `/></div><input type="hidden" value="1002236" name="${input_name}" class="countryofresistance area-id"/><ul class="drop-item wide">
                                   <li onclick="select_area_val(this)" class="li-item" data-value="ایران" data-id="1002236">ایران</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="أذربيجان" data-id="1002227">أذربيجان</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="الأرجنتين" data-id="1002172">الأرجنتين</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="آروبا" data-id="1002139">آروبا</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="جنوب أفريقيا" data-id="1002126">جنوب أفريقيا</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="أفريقيا الوسطى" data-id="1002087">أفريقيا الوسطى</li>
       <li
           onclick="select_area_val(this)" class="li-item" data-value="ألبانيا"
           data-id="1002040">ألبانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="ألمانيا"
           data-id="1002052">ألمانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="أنتيغوا وبربودا"
           data-id="1002138">أنتيغوا وبربودا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أندورا" data-id="1002041">أندورا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أنغولا" data-id="1002081">أنغولا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أنغيلا" data-id="1002137">أنغيلا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اتریش" data-id="1002042">اتریش</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أثيوبيا" data-id="1002096">أثيوبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الأردن" data-id="1002239">الأردن</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أرمينيا" data-id="1002226">أرمينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوروغواي" data-id="1002180">أوروغواي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="إريتريا" data-id="1002095">إريتريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوزبكستان" data-id="1002230">أوزبكستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="إسبانيا" data-id="1002077">إسبانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أستراليا" data-id="1002187">أستراليا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="إستونيا" data-id="1002048">إستونيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سلوفاكيا" data-id="1002075">سلوفاكيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سلوفينيا" data-id="1002076">سلوفينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أفغانستان" data-id="1002212">أفغانستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الاكوادور" data-id="1002176">الاكوادور</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الجزائر" data-id="1002080">الجزائر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سلفادور" data-id="1002149">سلفادور</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الإمارات العربية المتحدة" data-id="1002248">الإمارات العربية المتحدة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أندونيسيا" data-id="1002256">أندونيسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="انجلترا" data-id="1167330">انجلترا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوكرانيا" data-id="1002039">أوكرانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوغندا" data-id="1002132">أوغندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ولايات ميكرونيزيا الموحدة" data-id="1002196">ولايات ميكرونيزيا الموحدة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ایالات متحده" data-id="1002211">ایالات متحده</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الولايات المتحدة الجزر الهامشية" data-id="1198858">الولايات المتحدة الجزر الهامشية</li><li onclick="select_area_val(this)" class="li-item" data-value="ایتالیا" data-id="1002059">ایتالیا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أيسلندا" data-id="1002034">أيسلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بربادوس" data-id="1002141">بربادوس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر البهاما" data-id="1002140">جزر البهاما</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البحرين" data-id="1002234">البحرين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البرازيل" data-id="1002174">البرازيل</li><li
           onclick="select_area_val(this)" class="li-item" data-value="برمودا" data-id="1002167">برمودا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بروناي" data-id="1002250">بروناي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بيلاروسيا" data-id="1002037">بيلاروسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بلجيكا" data-id="1002043">بلجيكا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بلغاريا" data-id="1002044">بلغاريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بليز" data-id="1002142">بليز</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بنغلاديش" data-id="1002213">بنغلاديش</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بنين" data-id="1002082">بنين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بوتسوانا" data-id="1002083">بوتسوانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورما" data-id="1002251">بورما</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البوسنة والهرسك" data-id="1002036">البوسنة والهرسك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بوليفيا" data-id="1002173">بوليفيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مملكة بوتان" data-id="1002214">مملكة بوتان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="باراجواي" data-id="1002181">باراجواي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="باكستان" data-id="1002222">باكستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بالاو" data-id="1002203">بالاو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بنما" data-id="1002159">بنما</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البرتغال" data-id="1002072">البرتغال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بيرو" data-id="1002182">بيرو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بولينيزيا الفرنسية" data-id="1002190">بولينيزيا الفرنسية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بورتوريكو" data-id="1002160">بورتوريكو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="طاجيكستان" data-id="1002232">طاجيكستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تنزانيا" data-id="1002129">تنزانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تايلاند" data-id="1002264">تايلاند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تايوان" data-id="1002263">تايوان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تركمانستان" data-id="1002233">تركمانستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تركيا" data-id="1002247">تركيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ترينيداد وتوباغو" data-id="1002164">ترينيداد وتوباغو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="توغو" data-id="1002130">توغو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تونس" data-id="1002131">تونس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تونغا" data-id="1002209">تونغا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="توفالو" data-id="1002210">توفالو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تيمور الشرقية" data-id="1193762">تيمور الشرقية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جامايكا" data-id="1002155">جامايكا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جبل طارق" data-id="1002053">جبل طارق</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر سليمان" data-id="1002207">جزر سليمان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر فوكلاند (مالفيناس)" data-id="1002177">جزر فوكلاند
           (مالفيناس)</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر فيجي" data-id="1002189">جزر
           فيجي</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر كوك" data-id="1002188">جزر
           كوك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر كايمان" data-id="1002144">جزر كايمان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر مارشال" data-id="1002195">جزر مارشال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر ماريانا الشمالية" data-id="1002202">جزر ماريانا
           الشمالية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر والیس و فوتونا" data-id="1002194">جزر والیس و
           فوتونا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(أمريكا)" data-id="1002166">جزر ویرجین
           (أمريكا)</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(بريطانيا)" data-id="1002143">جزر ویرجین
           (بريطانيا)</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزیره جوادلوب" data-id="1002151">جزیره جوادلوب</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جمهورية أيرلندا" data-id="1002057">جمهورية أيرلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الجمهورية التشيكية" data-id="1002046">الجمهورية التشيكية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جمهورية الدومينيكان" data-id="1002148">جمهورية الدومينيكان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جيبوتي" data-id="1002092">جيبوتي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تشاد" data-id="1002088">تشاد</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الصين" data-id="1002215">الصين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الدنمارك" data-id="1002047">الدنمارك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="دومینیکا" data-id="1002147">دومینیکا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="رواندا" data-id="1002119">رواندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="روسيا" data-id="1002035">روسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="رومانيا" data-id="1002073">رومانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="زامبيا" data-id="1002104">زامبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اليابان" data-id="1002217">اليابان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سان تومي وبرينسيبي" data-id="1002121">سان تومي وبرينسيبي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ساحل العاج" data-id="1167335">ساحل العاج</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سریلانکا" data-id="1002225">سریلانکا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سان بيير وميكلون" data-id="1002170">سان بيير وميكلون</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت كيتس ونيفيس" data-id="1002161">سانت كيتس ونيفيس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت لوسيا" data-id="1002162">سانت لوسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت هيلين" data-id="1002120">سانت هيلين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت فنسنت وجزر غرينادين" data-id="1002163">سانت فنسنت و
           غرينادين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سنغافورة" data-id="1002262">سنغافورة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="السنغال" data-id="1002122">السنغال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="السويد" data-id="1002078">السويد</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سويسرا" data-id="1002079">سويسرا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سوازيلاند" data-id="1002128">سوازيلاند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="السودان" data-id="1002127">السودان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سورينام" data-id="1002183">سورينام</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سوريا" data-id="1002246">سوريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الصومال" data-id="1002125">الصومال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سيراليون" data-id="1002124">سيراليون</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سيشيل" data-id="1002123">سيشيل</li><li
           onclick="select_area_val(this)" class="li-item" data-value="شيلي" data-id="1002175">شيلي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="صربيا" data-id="1167332">صربيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="العراق" data-id="1002237">العراق</li><li
           onclick="select_area_val(this)" class="li-item" data-value="المملكة العربية السعودية" data-id="1002245">المملكة العربية السعودية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="عمان" data-id="1002243">عمان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غانا" data-id="1002099">غانا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فرنسا" data-id="1002051">فرنسا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فنلندا" data-id="1002050">فنلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فيلبيني" data-id="1002261">فيلبيني</li><li
           onclick="select_area_val(this)" class="li-item" data-value="قبرص" data-id="1002235">قبرص</li><li
           onclick="select_area_val(this)" class="li-item" data-value="قيرغيزستان" data-id="1002231">قيرغيزستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كازاخستان" data-id="1002229">كازاخستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="قطر" data-id="1002244">قطر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كوستاريكا" data-id="1002145">كوستاريكا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كاليدونيا الجديدة" data-id="1002198">كاليدونيا الجديدة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كمبوديا" data-id="1002252">كمبوديا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكاميرون" data-id="1002086">الكاميرون</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كندا" data-id="1002168">كندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كوريا الجنوبية" data-id="1002224">كوريا الجنوبية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كرواتيا" data-id="1002045">كرواتيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كولومبيا" data-id="1002184">كولومبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكونغو" data-id="1002090">الكونغو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكونغو، الجمهورية الديمقراطية" data-id="1198851">الكونغو، جمهورية
           الديمقراطية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كينيا" data-id="1002102">كينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="کوبا" data-id="1002146">کوبا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر القمر" data-id="1002089">جزر القمر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكويت" data-id="1002241">الكويت</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الرأس الأخضر" data-id="1002133">الرأس الأخضر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كيريباتي" data-id="1002192">كيريباتي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غامبيا" data-id="1002098">غامبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جورجيا" data-id="1002228">جورجيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جرينلاند" data-id="1002136">جرينلاند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غواتيمالا" data-id="1002152">غواتيمالا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غيانا" data-id="1002179">غيانا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غينيا" data-id="1002100">غينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غينيا الاستوائية" data-id="1002094">غينيا الاستوائية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غينيا بيساو" data-id="1002101">غينيا بيساو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="لاوس" data-id="1002258">لاوس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="لبنان" data-id="1002242">لبنان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ليسوتو" data-id="1002106">ليسوتو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بولندا" data-id="1002071">بولندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ليبيا" data-id="1002108">ليبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مدغشقر" data-id="1002109">مدغشقر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مارتينيك" data-id="1002156">مارتينيك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ماكاو" data-id="1002259">ماكاو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ملاوي" data-id="1002110">ملاوي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مالطا" data-id="1002067">مالطا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ماليزيا" data-id="1002260">ماليزيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تمويل" data-id="1002111">تمويل</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هنغاريا" data-id="1002056">هنغاريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="المغرب" data-id="1002114">المغرب</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مصر" data-id="1002093">مصر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="منغوليا" data-id="1002219">منغوليا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مقدونيا" data-id="1002066">مقدونيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="المكسيك" data-id="1002169">المكسيك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="موريتانيا" data-id="1002112">موريتانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="موريشيوس" data-id="1002134">موريشيوس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="موزمبيق" data-id="1002115">موزمبيق</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ناورو" data-id="1002197">ناورو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيبال" data-id="1002220">نيبال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="النرويج" data-id="1002070">النرويج</li><li
           onclick="select_area_val(this)" class="li-item" data-value="النيجر" data-id="1002117">النيجر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيجيريا" data-id="1002118">نيجيريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيكاراغوا" data-id="1002158">نيكاراغوا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيوزيلندا" data-id="1002199">نيوزيلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هايتي" data-id="1002153">هايتي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هولندا" data-id="1002069">هولندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الهند" data-id="1002216">الهند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هندوراس" data-id="1002154">هندوراس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هونج كونج" data-id="1002255">هونج كونج</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فانواتو" data-id="1002193">فانواتو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فنزويلا" data-id="1002185">فنزويلا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فيتنام" data-id="1002257">فيتنام</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اليمن" data-id="1002240">اليمن</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اليونان" data-id="1002054">اليونان</li>
       </ul></div>`;
                        element_child.innerHTML += string;
                        element_children.appendChild(element_child);


                    } else if (element_child_title == 'بلد إصدار جواز السفر') {
                        var element_child = document.createElement("div");
                        element_child.className = `package-info-item has-select-input unvisible ${internal}`;
                        var label = document.createElement("label");
                        label.innerHTML = element_child_title;
                        label.setAttribute("data-label", element_child_title);
                        element_child.appendChild(label);
                        var input_name = "";
                        var string = `<div class="inner-item"><input value="ایران" data-value="ایران" oninput="autoComplete_search(event,this,'area')" onblur="autoFill_search(event,this,'package-info-item')" onkeyup="tab_key(event,this)" onclick="toggle_area(this)" `;
                        for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                            if (schema[i].room[s].form[j].attrs[y].attr.name !== 'id' && schema[i].room[s].form[j].attrs[y].attr
                                .name !== 'placeholder' && schema[i].room[s].form[j].attrs[y].attr.name !== 'name') {
                                string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[
                                    y].attr.value + '" ';
                            }
                            if (schema[i].room[s].form[j].attrs[y].attr.name == 'name') {
                                input_name = schema[i].room[s].form[j].attrs[y].attr.value;
                            }
                        };
                        string += `></_input></div><input type="hidden" value="1002236" name="${input_name}" class="area-id passportissuecountry"></_input><ul class="drop-item wide">
                                   <li onclick="select_area_val(this)" class="li-item" data-value="ایران" data-id="1002236">ایران</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="أذربيجان" data-id="1002227">أذربيجان</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="الأرجنتين" data-id="1002172">الأرجنتين</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="آروبا" data-id="1002139">آروبا</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="جنوب أفريقيا" data-id="1002126">جنوب أفريقيا</li>
       <li onclick="select_area_val(this)" class="li-item" data-value="أفريقيا الوسطى" data-id="1002087">أفريقيا الوسطى</li>
       <li
           onclick="select_area_val(this)" class="li-item" data-value="ألبانيا"
           data-id="1002040">ألبانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="ألمانيا"
           data-id="1002052">ألمانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="أنتيغوا وبربودا"
           data-id="1002138">أنتيغوا وبربودا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أندورا" data-id="1002041">أندورا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أنغولا" data-id="1002081">أنغولا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أنغيلا" data-id="1002137">أنغيلا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اتریش" data-id="1002042">اتریش</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أثيوبيا" data-id="1002096">أثيوبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الأردن" data-id="1002239">الأردن</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أرمينيا" data-id="1002226">أرمينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوروغواي" data-id="1002180">أوروغواي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="إريتريا" data-id="1002095">إريتريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوزبكستان" data-id="1002230">أوزبكستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="إسبانيا" data-id="1002077">إسبانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أستراليا" data-id="1002187">أستراليا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="إستونيا" data-id="1002048">إستونيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سلوفاكيا" data-id="1002075">سلوفاكيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سلوفينيا" data-id="1002076">سلوفينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أفغانستان" data-id="1002212">أفغانستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الاكوادور" data-id="1002176">الاكوادور</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الجزائر" data-id="1002080">الجزائر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سلفادور" data-id="1002149">سلفادور</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الإمارات العربية المتحدة" data-id="1002248">الإمارات العربية المتحدة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أندونيسيا" data-id="1002256">أندونيسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="انجلترا" data-id="1167330">انجلترا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوكرانيا" data-id="1002039">أوكرانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أوغندا" data-id="1002132">أوغندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ولايات ميكرونيزيا الموحدة" data-id="1002196">ولايات ميكرونيزيا الموحدة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ایالات متحده" data-id="1002211">ایالات متحده</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الولايات المتحدة الجزر الهامشية" data-id="1198858">الولايات المتحدة الجزر الهامشية</li><li onclick="select_area_val(this)" class="li-item" data-value="ایتالیا" data-id="1002059">ایتالیا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="أيسلندا" data-id="1002034">أيسلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بربادوس" data-id="1002141">بربادوس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر البهاما" data-id="1002140">جزر البهاما</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البحرين" data-id="1002234">البحرين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البرازيل" data-id="1002174">البرازيل</li><li
           onclick="select_area_val(this)" class="li-item" data-value="برمودا" data-id="1002167">برمودا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بروناي" data-id="1002250">بروناي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بيلاروسيا" data-id="1002037">بيلاروسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بلجيكا" data-id="1002043">بلجيكا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بلغاريا" data-id="1002044">بلغاريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بليز" data-id="1002142">بليز</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بنغلاديش" data-id="1002213">بنغلاديش</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بنين" data-id="1002082">بنين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بوتسوانا" data-id="1002083">بوتسوانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورما" data-id="1002251">بورما</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البوسنة والهرسك" data-id="1002036">البوسنة والهرسك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بوليفيا" data-id="1002173">بوليفيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مملكة بوتان" data-id="1002214">مملكة بوتان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="باراجواي" data-id="1002181">باراجواي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="باكستان" data-id="1002222">باكستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بالاو" data-id="1002203">بالاو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بنما" data-id="1002159">بنما</li><li
           onclick="select_area_val(this)" class="li-item" data-value="البرتغال" data-id="1002072">البرتغال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بيرو" data-id="1002182">بيرو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بولينيزيا الفرنسية" data-id="1002190">بولينيزيا الفرنسية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بورتوريكو" data-id="1002160">بورتوريكو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="طاجيكستان" data-id="1002232">طاجيكستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تنزانيا" data-id="1002129">تنزانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تايلاند" data-id="1002264">تايلاند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تايوان" data-id="1002263">تايوان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تركمانستان" data-id="1002233">تركمانستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تركيا" data-id="1002247">تركيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ترينيداد وتوباغو" data-id="1002164">ترينيداد وتوباغو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="توغو" data-id="1002130">توغو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تونس" data-id="1002131">تونس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تونغا" data-id="1002209">تونغا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="توفالو" data-id="1002210">توفالو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تيمور الشرقية" data-id="1193762">تيمور الشرقية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جامايكا" data-id="1002155">جامايكا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جبل طارق" data-id="1002053">جبل طارق</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر سليمان" data-id="1002207">جزر سليمان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر فوكلاند (مالفيناس)" data-id="1002177">جزر فوكلاند
           (مالفيناس)</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر فيجي" data-id="1002189">جزر
           فيجي</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر كوك" data-id="1002188">جزر
           كوك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر كايمان" data-id="1002144">جزر كايمان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر مارشال" data-id="1002195">جزر مارشال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر ماريانا الشمالية" data-id="1002202">جزر ماريانا
           الشمالية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر والیس و فوتونا" data-id="1002194">جزر والیس و
           فوتونا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(أمريكا)" data-id="1002166">جزر ویرجین
           (أمريكا)</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(بريطانيا)" data-id="1002143">جزر ویرجین
           (بريطانيا)</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزیره جوادلوب" data-id="1002151">جزیره جوادلوب</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جمهورية أيرلندا" data-id="1002057">جمهورية أيرلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الجمهورية التشيكية" data-id="1002046">الجمهورية التشيكية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جمهورية الدومينيكان" data-id="1002148">جمهورية الدومينيكان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جيبوتي" data-id="1002092">جيبوتي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تشاد" data-id="1002088">تشاد</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الصين" data-id="1002215">الصين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الدنمارك" data-id="1002047">الدنمارك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="دومینیکا" data-id="1002147">دومینیکا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="رواندا" data-id="1002119">رواندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="روسيا" data-id="1002035">روسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="رومانيا" data-id="1002073">رومانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="زامبيا" data-id="1002104">زامبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اليابان" data-id="1002217">اليابان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سان تومي وبرينسيبي" data-id="1002121">سان تومي وبرينسيبي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ساحل العاج" data-id="1167335">ساحل العاج</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سریلانکا" data-id="1002225">سریلانکا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سان بيير وميكلون" data-id="1002170">سان بيير وميكلون</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت كيتس ونيفيس" data-id="1002161">سانت كيتس ونيفيس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت لوسيا" data-id="1002162">سانت لوسيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت هيلين" data-id="1002120">سانت هيلين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سانت فنسنت وجزر غرينادين" data-id="1002163">سانت فنسنت و
           غرينادين</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سنغافورة" data-id="1002262">سنغافورة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="السنغال" data-id="1002122">السنغال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="السويد" data-id="1002078">السويد</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سويسرا" data-id="1002079">سويسرا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سوازيلاند" data-id="1002128">سوازيلاند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="السودان" data-id="1002127">السودان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سورينام" data-id="1002183">سورينام</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سوريا" data-id="1002246">سوريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الصومال" data-id="1002125">الصومال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سيراليون" data-id="1002124">سيراليون</li><li
           onclick="select_area_val(this)" class="li-item" data-value="سيشيل" data-id="1002123">سيشيل</li><li
           onclick="select_area_val(this)" class="li-item" data-value="شيلي" data-id="1002175">شيلي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="صربيا" data-id="1167332">صربيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="العراق" data-id="1002237">العراق</li><li
           onclick="select_area_val(this)" class="li-item" data-value="المملكة العربية السعودية" data-id="1002245">المملكة العربية السعودية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="عمان" data-id="1002243">عمان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غانا" data-id="1002099">غانا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فرنسا" data-id="1002051">فرنسا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فنلندا" data-id="1002050">فنلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فيلبيني" data-id="1002261">فيلبيني</li><li
           onclick="select_area_val(this)" class="li-item" data-value="قبرص" data-id="1002235">قبرص</li><li
           onclick="select_area_val(this)" class="li-item" data-value="قيرغيزستان" data-id="1002231">قيرغيزستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كازاخستان" data-id="1002229">كازاخستان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="قطر" data-id="1002244">قطر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كوستاريكا" data-id="1002145">كوستاريكا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كاليدونيا الجديدة" data-id="1002198">كاليدونيا الجديدة</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كمبوديا" data-id="1002252">كمبوديا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكاميرون" data-id="1002086">الكاميرون</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كندا" data-id="1002168">كندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كوريا الجنوبية" data-id="1002224">كوريا الجنوبية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كرواتيا" data-id="1002045">كرواتيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كولومبيا" data-id="1002184">كولومبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكونغو" data-id="1002090">الكونغو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكونغو، الجمهورية الديمقراطية" data-id="1198851">الكونغو، جمهورية
           الديمقراطية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كينيا" data-id="1002102">كينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="کوبا" data-id="1002146">کوبا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جزر القمر" data-id="1002089">جزر القمر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الكويت" data-id="1002241">الكويت</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الرأس الأخضر" data-id="1002133">الرأس الأخضر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="كيريباتي" data-id="1002192">كيريباتي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غامبيا" data-id="1002098">غامبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جورجيا" data-id="1002228">جورجيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="جرينلاند" data-id="1002136">جرينلاند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غواتيمالا" data-id="1002152">غواتيمالا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غيانا" data-id="1002179">غيانا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غينيا" data-id="1002100">غينيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غينيا الاستوائية" data-id="1002094">غينيا الاستوائية</li><li
           onclick="select_area_val(this)" class="li-item" data-value="غينيا بيساو" data-id="1002101">غينيا بيساو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="لاوس" data-id="1002258">لاوس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="لبنان" data-id="1002242">لبنان</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ليسوتو" data-id="1002106">ليسوتو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="بولندا" data-id="1002071">بولندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ليبيا" data-id="1002108">ليبيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مدغشقر" data-id="1002109">مدغشقر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مارتينيك" data-id="1002156">مارتينيك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ماكاو" data-id="1002259">ماكاو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ملاوي" data-id="1002110">ملاوي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مالطا" data-id="1002067">مالطا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ماليزيا" data-id="1002260">ماليزيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="تمويل" data-id="1002111">تمويل</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هنغاريا" data-id="1002056">هنغاريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="المغرب" data-id="1002114">المغرب</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مصر" data-id="1002093">مصر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="منغوليا" data-id="1002219">منغوليا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="مقدونيا" data-id="1002066">مقدونيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="المكسيك" data-id="1002169">المكسيك</li><li
           onclick="select_area_val(this)" class="li-item" data-value="موريتانيا" data-id="1002112">موريتانيا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="موريشيوس" data-id="1002134">موريشيوس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="موزمبيق" data-id="1002115">موزمبيق</li><li
           onclick="select_area_val(this)" class="li-item" data-value="ناورو" data-id="1002197">ناورو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيبال" data-id="1002220">نيبال</li><li
           onclick="select_area_val(this)" class="li-item" data-value="النرويج" data-id="1002070">النرويج</li><li
           onclick="select_area_val(this)" class="li-item" data-value="النيجر" data-id="1002117">النيجر</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيجيريا" data-id="1002118">نيجيريا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيكاراغوا" data-id="1002158">نيكاراغوا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="نيوزيلندا" data-id="1002199">نيوزيلندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هايتي" data-id="1002153">هايتي</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هولندا" data-id="1002069">هولندا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="الهند" data-id="1002216">الهند</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هندوراس" data-id="1002154">هندوراس</li><li
           onclick="select_area_val(this)" class="li-item" data-value="هونج كونج" data-id="1002255">هونج كونج</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فانواتو" data-id="1002193">فانواتو</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فنزويلا" data-id="1002185">فنزويلا</li><li
           onclick="select_area_val(this)" class="li-item" data-value="فيتنام" data-id="1002257">فيتنام</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اليمن" data-id="1002240">اليمن</li><li
           onclick="select_area_val(this)" class="li-item" data-value="اليونان" data-id="1002054">اليونان</li>
       </ul></div>`;
                        element_child.innerHTML += string;
                        element_children.appendChild(element_child);


                    } else if (element_child_title == 'البرید الإلکتروني') {
                        var element_child = document.createElement("div");
                        element_child.className = `package-info-item unvisible passenger-email`;
                        var label = document.createElement("label");
                        label.innerHTML = element_child_title;
                        element_child.appendChild(label);
                        var string = `<div class="inner-item"><input `;
                        for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                            if (schema[i].room[s].form[j].attrs[y].attr.name !== 'id' && schema[i].room[s].form[j].attrs[y].attr
                                .name !== 'placeholder') {
                                string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[
                                    y].attr.value + '" ';
                            }
                        };
                        string += `/></div>`;
                        element_child.innerHTML += string;
                        element_children.appendChild(element_child);

                    } else if (element_child_title == 'رقم جواز السفر') {
                        var element_child = document.createElement("div");
                        if (document.querySelector(".main-container").getAttribute("data-schemaid") == 251) {
                            if (document.querySelector(".internal").value == 0 && document.querySelector(".provider").value == 0) {
                                element_child.className = `package-info-item ${internal} unvisible`;
                            } else {
                                element_child.className = `package-info-item ${internal}`;
                            }
                        } else {
                            element_child.className = `package-info-item ${internal}`;
                        }

                        var label = document.createElement("label");
                        label.innerHTML = element_child_title;
                        label.setAttribute("data-label", element_child_title);
                        element_child.appendChild(label);
                        element_child.setAttribute("onkeydown", "persian_key(event,this)");
                        var string = `<div class="inner-item"><input value="${internal == 'internal' ? '-' : ''}" onkeyup="this.value=this.value.replace(/[^0-9a-zA-Z]/g, '');" class="passportcode${internal == 'internal' ? '' : ' necessary'}"`;
                        for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                            if (schema[i].room[s].form[j].attrs[y].attr.name !== 'id' && schema[i].room[s].form[j].attrs[y].attr
                                .name !== 'placeholder' && schema[i].room[s].form[j].attrs[y].attr
                                    .name !== 'class') {
                                string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[
                                    y].attr.value + '" ';
                            }
                        };
                        string += `/></div>`;
                        element_child.innerHTML += string;
                        if (document.querySelector(".main-container").getAttribute("data-schemaid") == 251) {
                            if (document.querySelector(".internal").value == 0 && document.querySelector(".provider").value == 0) {
                                element_child.querySelector("input").classList.remove("necessary");
                                element_child.querySelector("input").value = "-"
                            }
                        }
                        element_children.appendChild(element_child);

                    } else if (element_child_title == 'roomid' || element_child_title == 'type') {
                        var element_child = document.createElement("div");
                        element_child.className = `package-info-item unvisible`;
                        var label = document.createElement("label");
                        label.innerHTML = element_child_title;
                        label.setAttribute("data-label", element_child_title);
                        element_child.appendChild(label);
                        var string = `<input `;
                        for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                            string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[
                                y].attr.value + '" ';
                        };
                        string += `/>`;
                        element_child.innerHTML += string;
                        element_children.appendChild(element_child);
                    } else {
                        var element_child = document.createElement("div");
                        if (element_child_title == 'رقم الهویة الوطنية') {
                            if (document.querySelector(".main-container").getAttribute("data-schemaid") == 251) {
                                if (document.querySelector(".internal").value == 0 && document.querySelector(".provider").value == 0) {
                                    element_child.className = `package-info-item unvisible`;
                                } else {
                                    element_child.className = `package-info-item`;
                                }
                            } else {
                                element_child.className = `package-info-item`;
                            }

                        } else {
                            element_child.className = `package-info-item`;
                        }
                        var label = document.createElement("label");
                        label.innerHTML = element_child_title;
                        element_child.appendChild(label);
                        var string = `<div class="inner-item"><input `;
                        console.log("ok2=" + element_child_title)
                        if (element_child_title == 'الاسم الأول باللغة الإنجليزية') {
                            label.setAttribute("data-label", "الاسم");
                            string += `onkeydown="english_key(event,this)" onkeyup="upperCase_key(event,this)"`;
                        }
                        if (element_child_title == 'اللقب باللغة الإنجليزية') {
                            label.setAttribute("data-label", "اللقب");
                            string += `onkeydown="english_key(event,this)" onkeyup="upperCase_key(event,this)"`;
                        }

                        if (element_child_title == 'رقم الهویة الوطنية') {
                            label.setAttribute("data-label", element_child_title);
                            string +=
                                `onkeyup="this.value=this.value.replace(/[^0-9]/g, '');" onkeydown="persian_key(event,this)"`;
                        }
                        for (var y = 0; y < schema[i].room[s].form[j].attrs.length; y++) {
                            if (schema[i].room[s].form[j].attrs[y].attr.name !== 'id' && schema[i].room[s].form[j].attrs[y].attr
                                .name !== 'placeholder') {
                                string += schema[i].room[s].form[j].attrs[y].attr.name + '="' + schema[i].room[s].form[j].attrs[
                                    y].attr.value + '" ';
                            }
                        };
                        string += `/></div>`;
                        element_child.innerHTML += string;
                        if (document.querySelector(".main-container").getAttribute("data-schemaid") == 251) {
                            if (element_child.querySelector("input").classList.contains("NationalCode")) {
                                if (document.querySelector(".internal").value == 0 && document.querySelector(".provider").value == 0) {
                                    element_child.querySelector("input").classList.remove("necessary");
                                    element_child.querySelector("input").value = "-"
                                }
                            }
                        }
                        element_children.appendChild(element_child);
                    }
                }

                element_room.appendChild(element_children);
            };
            var element_clr = document.createElement("div");
            element_clr.className = "clr";
            element_children.appendChild(element_clr);
            element.appendChild(element_room);
        }

        document.querySelector(".passengers-info-content").appendChild(element);

    };
    create_array_data('has-room');
};
//<!----------------END JS PASSENGER---------------->



//<!----------------START JS PASSENGERS FORM---------------->
function toggle_date(element, type) {
    element.setAttribute("data-id", "");
    element.value = "";
    reset_drop_item();
    element.closest(".passenger-date-item").querySelector(".drop-item").classList.toggle(
        "drop-item-toggle");
    if (type == 'day') {
        renderData(data_day, type, element);
    } else if (type == 'month') {
        renderData(data_month, type, element);
    } else if (type == 'year-birthdate') {
        renderData(data_year_birthdate, type, element);
    } else if (type == 'year-passport') {
        renderData(data_year_passport, type, element);
    } else if (type == 'year-service') {
        renderData(data_year_service, type, element);
    } else if (type == 'year-visa') {
        renderData(data_year_visa, type, element);
    }

};

function toggle_gender(element) {
    reset_drop_item();
    element.closest(".package-info-item").querySelector(".drop-item").classList.toggle(
        "drop-item-toggle");
};

function select_date_val(element) {
    if (element.getAttribute("data-id")) {
        element.closest(".passenger-date-item").querySelector("input").setAttribute("data-id", element
            .getAttribute("data-id"));
        element.closest(".passenger-date-item").querySelector("input").value = element.getAttribute(
            "data-value");

    } else {
        element.closest(".passenger-date-item").querySelector("input").value = element.innerText;
    }
    element.closest(".passenger-date-item").querySelector(".drop-item").classList.remove("drop-item-toggle");
    create_date(element.closest(".passenger-date-item"));
};
// updated login

function select_gender_val(element) {
    element.closest(".package-info-item").querySelector("input[type=text]").value = element.innerText;
    element.closest(".package-info-item").querySelector(".gender-id").value = element.getAttribute("data-value");
    if (element.closest(".package-info-item").querySelector(".description")) {
        element.closest(".package-info-item").querySelector(".description").remove();
        element.closest(".package-info-item").querySelector("input").closest(".inner-item").classList.remove("invalid");
    };
    element.closest(".package-info-item").querySelector(".drop-item").classList.remove("drop-item-toggle");
    if (element.closest(".check-has-data")) {
        element.closest(".package-info-item").querySelector(".gender-id-trust").dataset.changed = 1;
        element.closest(".package-info-item").querySelector(".gender-id-trust").value = element.getAttribute("data-trust");
    }
};

function english_key(event, element) {
    if (element.closest(".package-info-item").querySelector(".description")) {
        element.closest(".package-info-item").querySelector(".description").remove();
    };
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = event.key;
    if (!regex.test(key)) {
        event.preventDefault();
        element.closest(".inner-item").classList.add("invalid");
        element.closest(".package-info-item").insertAdjacentHTML('beforeend',
            `<div class="description">تغيير لوحة المفاتيح إلى اللغة الإنجليزية.</div>`)
        return false;
    } else {
        element.closest(".inner-item").classList.remove("invalid");
    }

};

function upperCase_key(event, element) {
    const element_splited = element.value.split(" ");
    for (var i = 0; i < element_splited.length; i++) {
        element_splited[i] = element_splited[i].charAt(0).toUpperCase() + element_splited[i].slice(1);

    }
    element.value = element_splited.join(" ");

};

function select_area_val(element) {
    let parent_element = "passenger-info-content";
    if (element.closest(".passenger")) {
        parent_element = "passenger"
    };
    if (element.closest(".package-info-item").querySelector(".description")) {
        element.closest(".package-info-item").querySelector(".description").remove();
        element.closest(".package-info-item").querySelector("input").closest(".inner-item").classList.remove("invalid");
    };
    element.closest(".package-info-item").querySelector(".country").value = element.innerText;
    element.closest(".package-info-item").querySelector(".country").setAttribute("data-value", element.innerText);
    element.closest(".package-info-item").querySelector(".country").setAttribute("data-id", element.getAttribute(
        "data-id"));
    element.closest(".package-info-item").querySelector(".area-id").value = element.getAttribute(
        "data-id");

    element.closest(".package-info-item").querySelector(".country").classList.remove("run-autoComplete_search");
    if (document.querySelector(".internal").value == 1 || document.querySelector(".internal").value == 1002236) {
        if (element.getAttribute("data-id") == 1002236) {
            if (element.closest(`.${parent_element}`).querySelector(".passportcode")) {
                if (!element.closest(`.${parent_element}`).querySelector(".passportcode").closest(
                    ".package-info-item").classList.contains("internal")) {
                    element.closest(`.${parent_element}`).querySelector(".passportcode").closest(
                        ".package-info-item").classList.add("internal");
                }
            };
            if (element.closest(`.${parent_element}`).querySelector(".passexpiredate")) {
                if (!element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".package-info-item").classList.contains("internal")) {
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".package-info-item").classList.add("internal");
                }
            };

            if (element.closest(`.${parent_element}`).querySelector(".NationalCode")) {
                if (element.closest(`.${parent_element}`).querySelector(".NationalCode").classList
                    .contains("not-active")) {
                    element.closest(`.${parent_element}`).querySelector(".NationalCode")
                        .removeAttribute("readonly");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").classList
                        .remove("not-active");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").classList.add(
                        "necessary");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").value = '';
                }
            }
            if (element.closest(`.${parent_element}`).querySelector(".passportcode")) {
                if (element.closest(`.${parent_element}`).querySelector(".passportcode").classList
                    .contains("necessary")) {
                    element.closest(`.${parent_element}`).querySelector(".passportcode").setAttribute(
                        "readonly", true);
                    element.closest(`.${parent_element}`).querySelector(".passportcode").classList.add(
                        "not-active");
                    element.closest(`.${parent_element}`).querySelector(".passportcode").classList
                        .remove("necessary");
                    element.closest(`.${parent_element}`).querySelector(".passportcode").value = '-';
                }
                if (element.closest(`.${parent_element}`).querySelector(".DrawerCo")) {
                    if (!element.closest(`.${parent_element}`).querySelector(".DrawerCo").closest(
                        ".package-info-item").classList.contains("internal")) {
                        element.closest(`.${parent_element}`).querySelector(".DrawerCo").closest(
                            ".package-info-item").classList.add("internal");
                    };
                    element.closest(`.${parent_element}`).querySelector(".DrawerCo").setAttribute(
                        "readonly", true);
                    element.closest(`.${parent_element}`).querySelector(".DrawerCo").classList.add(
                        "not-active");
                    element.closest(`.${parent_element}`).querySelector(".DrawerCo").classList
                        .remove("necessary");
                    element.closest(`.${parent_element}`).querySelector(".DrawerCo").value = '-';
                };
                if (element.closest(`.${parent_element}`).querySelector(".passexpiredate")) {
                    // element.closest(`.${parent_element}`).querySelector(".passexpiredate").value = '-';
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".passenger-date-items").querySelector(".day").classList.add("not-active");
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".passenger-date-items").querySelector(".day").setAttribute("readonly", true);
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".passenger-date-items").querySelector(".day").classList.remove("necessary");
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".passenger-date-items").querySelector(".year").classList.add("not-active");
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".passenger-date-items").querySelector(".year").setAttribute("readonly", true);
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".passenger-date-items").querySelector(".year").classList.remove("necessary");
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".passenger-date-items").querySelector(".month").classList.add("not-active");
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".passenger-date-items").querySelector(".month").setAttribute("readonly", true);
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".passenger-date-items").querySelector(".month").classList.remove("necessary");
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").classList.remove("necessary");
                }

            }


        } else {
            if (element.closest(`.${parent_element}`).querySelector(".NationalCode")) {
                if (element.closest(`.${parent_element}`).querySelector(".NationalCode").classList
                    .contains("necessary")) {
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").setAttribute(
                        "readonly", true);
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").classList
                        .remove("necessary");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").classList.add(
                        "not-active");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").value = '-';
                }
            }
            if (element.closest(`.${parent_element}`).querySelector(".passportcode")) {
                if (element.closest(`.${parent_element}`).querySelector(".passportcode").closest(
                    ".package-info-item").classList.contains("internal")) {
                    element.closest(`.${parent_element}`).querySelector(".passportcode").closest(
                        ".package-info-item").classList.remove("internal");
                }
            };

            if (element.closest(`.${parent_element}`).querySelector(".passexpiredate")) {
                if (element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".package-info-item").classList.contains("internal")) {
                    element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                        ".package-info-item").classList.remove("internal");

                }
            };


            if (element.closest(`.${parent_element}`).querySelector(".passportcode")) {
                element.closest(`.${parent_element}`).querySelector(".passportcode").removeAttribute(
                    "readonly");
                element.closest(`.${parent_element}`).querySelector(".passportcode").classList.add(
                    "necessary");
                element.closest(`.${parent_element}`).querySelector(".passportcode").classList.remove(
                    "not-active");
                element.closest(`.${parent_element}`).querySelector(".passportcode").value = '';
            }

            if (element.closest(`.${parent_element}`).querySelector(".DrawerCo")) {
                if (element.closest(`.${parent_element}`).querySelector(".DrawerCo").closest(
                    ".package-info-item").classList.contains("internal")) {
                    element.closest(`.${parent_element}`).querySelector(".DrawerCo").closest(
                        ".package-info-item").classList.remove("internal");
                };
                element.closest(`.${parent_element}`).querySelector(".DrawerCo").removeAttribute(
                    "readonly");
                element.closest(`.${parent_element}`).querySelector(".DrawerCo").classList.add(
                    "necessary");
                element.closest(`.${parent_element}`).querySelector(".DrawerCo").classList.remove(
                    "not-active");
                element.closest(`.${parent_element}`).querySelector(".DrawerCo").value = '';
            }

            if (element.closest(`.${parent_element}`).querySelector(".passexpiredate")) {
                //element.closest(`.${parent_element}`).querySelector(".passexpiredate").value = '';
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".day").classList.add("necessary");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".day").removeAttribute("readonly");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".day").classList.remove("not-active");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".year").classList.add("necessary");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".year").removeAttribute("readonly");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".year").classList.remove("not-active");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".month").classList.add("necessary");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".month").removeAttribute("readonly");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".month").classList.remove("not-active");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").classList.add("necessary");
            }


        }
    } else {
        if (element.closest(`.${parent_element}`).querySelector(".passportcode")) {
            if (element.closest(`.${parent_element}`).querySelector(".passportcode").classList
                .contains("not-active")) {
                element.closest(`.${parent_element}`).querySelector(".passportcode").removeAttribute(
                    "readonly");
                element.closest(`.${parent_element}`).querySelector(".passportcode").classList.add(
                    "necessary");
                element.closest(`.${parent_element}`).querySelector(".passportcode").classList.remove(
                    "not-active");
                element.closest(`.${parent_element}`).querySelector(".passportcode").value = '';
            }
            if (element.closest(`.${parent_element}`).querySelector(".DrawerCo")) {
                element.closest(`.${parent_element}`).querySelector(".DrawerCo").removeAttribute(
                    "readonly");
                element.closest(`.${parent_element}`).querySelector(".DrawerCo").classList.add(
                    "necessary");
                element.closest(`.${parent_element}`).querySelector(".DrawerCo").classList.remove(
                    "not-active");
                element.closest(`.${parent_element}`).querySelector(".DrawerCo").value = '';
            }
            if (element.closest(`.${parent_element}`).querySelector(".passexpiredate")) {
                //element.closest(`.${parent_element}`).querySelector(".passexpiredate").value = '';
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".day").classList.add("necessary");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".day").removeAttribute("readonly");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".day").classList.remove("not-active");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".year").classList.add("necessary");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".year").removeAttribute("readonly");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".year").classList.remove("not-active");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".month").classList.add("necessary");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".month").removeAttribute("readonly");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").closest(
                    ".passenger-date-items").querySelector(".month").classList.remove("not-active");
                element.closest(`.${parent_element}`).querySelector(".passexpiredate").classList.add("necessary");
            }

        }


        if (element.getAttribute("data-id") == 1002236) {
            if (element.closest(`.${parent_element}`).querySelector(".NationalCode")) {
                if (element.closest(`.${parent_element}`).querySelector(".NationalCode").classList
                    .contains("not-active")) {
                    element.closest(`.${parent_element}`).querySelector(".NationalCode")
                        .removeAttribute("readonly");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").classList
                        .remove("not-active");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").classList.add(
                        "necessary");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").value = '';
                }
            }

        } else {
            if (element.closest(`.${parent_element}`).querySelector(".NationalCode")) {
                if (element.closest(`.${parent_element}`).querySelector(".NationalCode").classList
                    .contains("necessary")) {
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").setAttribute(
                        "readonly", true);
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").classList
                        .remove("necessary");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").classList.add(
                        "not-active");
                    element.closest(`.${parent_element}`).querySelector(".NationalCode").value = '-';
                }
            }

        }
    }
    element.closest(".package-info-item").querySelector(".drop-item").classList.remove("drop-item-toggle");

    if (element.closest(`.${parent_element}`).querySelector(".passportissuecountry")) {
        if (element.closest(".package-info-item").querySelector(".area-id").getAttribute("name").indexOf('issuecountry') > -1) {
            element.closest(`.${parent_element}`).querySelector(".passportissuecountry").value = element.getAttribute("data-id");
            element.closest(`.${parent_element}`).querySelector(".passportissuecountry").closest(".package-info-item").querySelector(".country").value = element.innerText;
        }
    }



};

function autoComplete_search(event, element, type) {
    element.classList.add("run-autoComplete_search");
    let parentElement = element.closest(".package-info-item");
    if (element.closest(".passenger-date-item")) {
        parentElement = element.closest(".passenger-date-item")
    } else if (element.closest(".package-code-item")) {
        parentElement = element.closest(".package-code-item")
    }

    let count = 0;

    parentElement.querySelector(".drop-item").querySelectorAll("li").forEach(e => {
        if (e.dataset.value ? e.dataset.value.toLowerCase().includes(element.value.toLowerCase()) || e.dataset.id.toLowerCase().includes(element.value.toLowerCase()) : e.innerText.toLowerCase().includes(element.value.toLowerCase())) {
            count++;
            e.classList.remove('unvisible')
        } else {
            e.classList.add('unvisible')
        }
    })

    if (count == 0) {
        parentElement.querySelector(".drop-item").insertAdjacentHTML('beforeend', `<li class="nodata" data-value="" data-id="">لم يتم العثور على أي عناصر</li>`)
    } else {
        if (parentElement.querySelector(".drop-item").querySelector(".nodata")) { parentElement.querySelector(".drop-item").querySelector(".nodata").remove() }

    }

};

function autoFill_search(event, element, type) {
    if (element.getAttribute("data-id") == '') {
        element.value = '';
        // element.setAttribute("data-id", element.closest(`.${type}`).querySelector(".drop-item").getElementsByClassName("li-item")[0].getAttribute("data-id"))
        // if (type == 'passenger-date-item') {
        //     create_date(element.closest(".passenger-date-item"));
        // }

    }
};


function renderData(arrayOfData, type, element) {
    let li_list = "";
    if (type == 'area') {
        for (let i = 0; i < arrayOfData.length; i++) {
            li_list += `<li onclick="select_area_val(this)" class="li-item" data-id="${arrayOfData[i].data_id}" data-value="${arrayOfData[i].data_value}">${arrayOfData[i].data_value}</li>`;
        }
        element.closest(".package-info-item").querySelector(".drop-item").innerHTML = li_list;
    } else if (type == "code") {
        for (let i = 0; i < arrayOfData.length; i++) {
            li_list +=
                `<li onclick="select_code_val(this)" class="li-item" data-dial_code="${arrayOfData[i].dial_code}" data-code="${arrayOfData[i].code}"> (${arrayOfData[i].dial_code}) ${arrayOfData[i].name}</li>`;
        }
        if (element == "default") {
            for (var i = 0; i < document.querySelector(".cips-info-content").getElementsByClassName(
                "package-number-items").length; i++) {
                document.querySelector(".cips-info-content").getElementsByClassName(
                    "package-number-items")[i]
                    .querySelector(".drop-item").innerHTML = li_list;
            }
        } else {
            element.closest(".package-code-item").querySelector(".drop-item").innerHTML = li_list;
        }
    } else {
        if (document.querySelector(".internal").value == 1 || document.querySelector(".internal").value == 1002236) {
            if (element.closest(".passenger-info-items").querySelector(".issuecountry")) {
                if (element.closest(".passenger-info-items").querySelector(".issuecountry").value == 1002236) {
                    for (let i = 0; i < arrayOfData.length; i++) {
                        if (type == 'month' || type == 'year-birthdate' || type == 'year-passport') {
                            li_list += `<li onclick="select_date_val(this)" class="li-item"  data-switch="${arrayOfData[i].data_switch}"  data-default="${arrayOfData[i].data_default}" data-id="${arrayOfData[i].data_id}" data-value="${arrayOfData[i].data_default}">${arrayOfData[i].data_default}</li>`;

                        } else {
                            li_list += `<li onclick="select_date_val(this)" class="li-item"  data-switch="${arrayOfData[i].data_switch}"  data-default="${arrayOfData[i].data_default}" data-id="${arrayOfData[i].data_id}" data-value="${arrayOfData[i].data_value}">${arrayOfData[i].data_value}</li>`;
                        }
                    }

                } else {
                    for (let i = 0; i < arrayOfData.length; i++) {
                        if (type == 'year-birthdate' || type == 'year-passport') {
                            li_list += `<li onclick="select_date_val(this)" class="li-item"  data-switch="${arrayOfData[i].data_default}"  data-default="${arrayOfData[i].data_switch}" data-id="${arrayOfData[i].data_switch}" data-value="${arrayOfData[i].data_switch}">${arrayOfData[i].data_switch}</li>`;

                        } else if (type == 'month') {
                            li_list += `<li onclick="select_date_val(this)" class="li-item"  data-switch="${arrayOfData[i].data_default}"  data-default="${arrayOfData[i].data_switch}" data-id="${arrayOfData[i].data_id}" data-value="${arrayOfData[i].data_switch}">${arrayOfData[i].data_switch}</li>`;

                        } else {
                            li_list += `<li onclick="select_date_val(this)" class="li-item"  data-switch="${arrayOfData[i].data_switch}"  data-default="${arrayOfData[i].data_default}" data-id="${arrayOfData[i].data_id}" data-value="${arrayOfData[i].data_value}">${arrayOfData[i].data_value}</li>`;
                        }




                    }

                }
            } else {
                for (let i = 0; i < arrayOfData.length; i++) {
                    li_list += `<li onclick="select_date_val(this)" class="li-item"  data-switch="${arrayOfData[i].data_switch}"  data-default="${arrayOfData[i].data_default}" data-id="${arrayOfData[i].data_id}" data-value="${arrayOfData[i].data_value}">${arrayOfData[i].data_value}</li>`;
                }
            }

        } else {
            for (let i = 0; i < arrayOfData.length; i++) {
                li_list += `<li onclick="select_date_val(this)" class="li-item"  data-switch="${arrayOfData[i].data_switch}"  data-default="${arrayOfData[i].data_default}" data-id="${arrayOfData[i].data_id}" data-value="${arrayOfData[i].data_value}">${arrayOfData[i].data_value}</li>`;
            }
        }

        element.closest(".passenger-date-item").querySelector(".drop-item").innerHTML = li_list;

    }




};

function toggle_area(element) {
    reset_drop_item();
    element.closest(".package-info-item").querySelector(".drop-item").classList.toggle(
        "drop-item-toggle");
    renderData(data_area, 'area', element);
};

function select_code_val(element) {
    element.closest(".package-info-item").querySelector(".code").value = element.getAttribute(
        "data-dial_code");
    if (element.closest(".package-info-item").querySelector(".description")) {
        element.closest(".package-info-item").querySelector(".description").remove();
        element.closest(".package-info-item").querySelector("input").closest(".inner-item").classList.remove("invalid");
    };

    if (element.closest(".package-info-item").querySelector(".code-number")) {
        element.closest(".package-info-item").querySelector(".code-number").value = element.getAttribute(
            "data-dial_code");
    }
    element.closest(".package-info-item").querySelector(".drop-item").classList.remove(
        "drop-item-toggle");
    element.closest(".package-info-item").querySelector(".code").classList.remove(
        "run-autoComplete_search");
};

function toggle_codeCountry(element, type) {
    reset_drop_item();
    element.closest(".package-info-item").querySelector(".drop-item").classList.toggle(
        "drop-item-toggle");
    renderData(data_countryCode, "code", element);

};

function reset_drop_item() {
    for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
        for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("drop-item").length; j++) {
            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("drop-item")[j].classList.contains("drop-item-toggle")) {

                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("drop-item")[j].classList.remove(
                    "drop-item-toggle");
            }
        }
    }
};

function tab_key(e, element) {
    e = e || window.event;
    if (e.keyCode !== 13 && e.keyCode !== 40 && e.keyCode !== 38) {
        if (!element.classList.contains("run-autoComplete_search")) {
            element.click();
        }

    }
};

function persian_key(event, element) {
    var p = /^[\u0600-\u06FF\s]+$/;
    return p.test(event.key) && event.key != ' ';
};

function create_date(element) {
    element.closest(".package-info-item").querySelector(".datepicker").value = element.closest(".package-info-item").querySelector(".year").value + '-' + element.closest(".package-info-item").querySelector(".month").getAttribute("data-id") + '-' + element.closest(".package-info-item").querySelector(".day").getAttribute("data-id");
    element.querySelector("input").closest(".inner-item").classList.remove("invalid");
    element.querySelector("input").classList.remove("run-autoComplete_search");
    if (element.closest(".package-info-item").querySelector(".year").value !== '' && element.closest(".package-info-item").querySelector(".month").value !== '' && element.closest(".package-info-item").querySelector(".day").value !== '') {
        if (element.closest(".package-info-item").querySelector(".description")) {
            element.closest(".package-info-item").querySelector(".description").remove();
        }
        if (element.closest(".passenger-date-items").classList.contains("internal")) {
            var regex = /^\d{4}-\d{2}-\d{2}$/;

            // ADDED FOR DATE VALIDATION
            var new_date = element.closest(".package-info-item").querySelector(".datepicker").value;
            var new_date_splited = new_date.split("-")
            var check_year = new_date_splited[0]
            var check_month = new_date_splited[1]
            var check_day = new_date_splited[2]
            const leapYears = [1300, 1309, 1313, 1317, 1321, 1325, 1329, 1333, 1337, 1342, 1346, 1350, 1354, 1358, 1362, 1366, 1370, 1375, 1379, 1383, 1387, 1391, 1395, 1399, 1403, 1408, 1412, 1416, 1420, 1424, 1428, 1432, 1436, 1441];

            function isLeapYearInList(check_year) {
                var year = parseInt(check_year)
                return leapYears.includes(year);
            }
            if (check_month > 6 && check_day > 30) {
                return false;
            } else if (check_month == 12 && check_day == 30) {
                if (isLeapYearInList(check_year)) {
                    if (parseInt(check_year) > 1300 && parseInt(check_year) < 1500) {
                        convert_jalali_toGregorian(element.closest(".package-info-item"));
                    }
                } else {
                    return false;
                }
            } else {
                if (parseInt(check_year) > 1300 && parseInt(check_year) < 1500) {
                    convert_jalali_toGregorian(element.closest(".package-info-item"));
                }
            }
        };
        if (document.querySelector(".main-container").getAttribute("data-schemaid") == 250) {
            if (element.closest(".package-info-item").querySelector(".datepicker").getAttribute("name").indexOf("birthdate") > 1) {
                calculate_age(element.closest(".package-info-item").querySelector(".year").value, element.closest(".package-info-item").querySelector(".month").value, element.closest(".package-info-item").querySelector(".day").value, element);
            }
        }
    }
};

function convert_jalali_toGregorian(element) {
    var date = element.querySelector(".datepicker").value;
    date_splited = date.split("-"),
        gregorian_date = JalaliDate.jalaliToGregorian(date_splited[0], date_splited[1], date_splited[2]);
    date_converted = gregorian_date[0] + "-" + gregorian_date[1] + "-" + gregorian_date[2];
    element.querySelector(".datepicker").value = date_converted
};
document.onkeydown = checkKey;
var index = -1;
var liSelected;

function checkKey(e) {
    e = e || window.event;
    for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
        for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("drop-item").length; j++) {
            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("drop-item")[j].classList.contains("drop-item-toggle")) {
                var items = Array.from(
                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("drop-item")[j].getElementsByClassName("li-item")
                ).filter(item => !item.classList.contains("unvisible"));

                var len = items.length - 1;
                if (e.keyCode == 38) {

                    // up arrow
                    if (liSelected) {
                        li_isnot_selected(liSelected, "selected");
                        index--;
                        next = items[index];

                        if (typeof next !== 'undefined' && index >= 0) {
                            liSelected = next;
                        } else {
                            index = len;
                            liSelected = items[len];
                        }

                        li_isnot_selected(liSelected, "selected");
                    } else {
                        index = len;
                        liSelected = items[len];
                        li_isnot_selected(liSelected, "selected");
                    }
                } else if (e.keyCode == 40) {

                    // down arrow
                    index++;
                    if (liSelected) {
                        console.log('liSelected1');
                        next = items[index];
                        if (typeof next !== 'undefined' && index <= len) {
                            liSelected = next;
                        } else {
                            index = 0;
                            liSelected = items[0];
                        }
                    } else {
                        console.log('liSelected0');
                        index = 0;
                        liSelected = items[0];
                    }
                    li_is_selected(liSelected, "selected");

                } else if (e.keyCode == 13) {

                    // enter 
                    items[index].click();
                    items[index].classList.remove("selected");
                    index = -1;
                }
            }
        }
    }
};

function li_is_selected(el, className) {
    if (el.classList) {
        if (el.previousElementSibling) {
            el.previousElementSibling.classList.remove(className);
        }
        el.classList.add(className);

    } else {
        el.className += ' ' + className;
    }
};

function li_isnot_selected(el, className) {
    if (el.classList) {
        if (el.previousElementSibling) {
            el.previousElementSibling.classList.add(className);
        }
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
};
//<!----------------END JS PASSENGERS FORM---------------->
//<!----------------START JS EXTERA SERVICE FLIGHT---------------->
var sum_extra_service = 0;

function load_extra_service(element, type) {
    if ($(element).is(":checked")) {
        let url = "";
        if (type == 'train') {
            url = "/Client_Extra_Service_Train_Ar_ver.2.bc"
        } else {
            url = "/Client_Extra_Service_Ar_ver.2.bc"
        }
        if ($(element).val() == "-") {
            $(element).val('');
            $(element).closest(".package-info-item").find(".mini-loading").show();
            $.post(`${url}`, {
                extra_service: $(".extra_service").val()
            }, function (response) {
                $(element).closest(".package-info-item").find(".mini-loading").hide();
                $(element).closest(".passenger-info-items").find(".extra_services")
                    .html(response);
                $(element).closest(".passenger-info-items").find(".extra_services")
                    .show();
                $(element).closest(".passenger-info-items").siblings(
                    ".passenger-info-items").find(".extra_services").html(response);

            });

        } else {
            $(element).closest(".passenger-info-items").find(".extra_services").show();
        }
    } else {
        var defaultService = $('.extra_service_default');
        select_extra_service(defaultService);
        $(element).closest(".passenger-info-items").find(".extra_services").hide();
    }

};
//<!----------------END JS EXTERA SERVICE FLIGHT---------------->
//<!----------------START JS NEXT STEP FLIGHT---------------->

//<!----------------START JS NEXT STEP FLIGHT---------------->
function next_step(element) {
    if (document.querySelector(".main-container").getAttribute("data-schemaid") == 290 || document.querySelector(".main-container").getAttribute("data-schemaid") == 291 || document.querySelector(".main-container").getAttribute("data-schemaid") == 292 || document.querySelector(".main-container").getAttribute("data-schemaid") == 139 || document.querySelector(".main-container").getAttribute("data-schemaid") == 401 || document.querySelector(".main-container").getAttribute("data-schemaid") == 402 || document.querySelector(".main-container").getAttribute("data-schemaid") == 501) {
        if (element.getAttribute("data-step") == "passenger") {
            var isExist = true;
            var isValid = true;
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description").remove();
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary")) {
                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").value == "") {
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل تفاصيل الركاب</div>`);
                            isExist = false;
                        }
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")) {
                        for (var y = 0; y < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item").length; y++) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary")) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                            };
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary")) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").value == "") {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                    isExist = false;
                                } else {

                                    if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").getAttribute("data-id") && document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").getAttribute("data-id") == "") {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل تفاصيل الركاب</div>`);
                                        isExist = false;
                                    }
                                }
                            }
                        }
                    };

                };


            };
            if (document.querySelector(".passengers-notices-content")) {
                for (var i = 0; i < document.querySelector(".passengers-notices-content").getElementsByClassName("package-info-item").length; i++) {
                    if (document.querySelector(".passengers-notices-content").getElementsByClassName("package-info-item")[i].querySelector(".description")) {
                        document.querySelector(".passengers-notices-content").getElementsByClassName("package-info-item")[i].querySelector(".description").remove();
                    };
                    if (document.querySelector(".passengers-notices-content").getElementsByClassName("package-info-item")[i].querySelector(".necessary")) {
                        document.querySelector(".passengers-notices-content").getElementsByClassName("package-info-item")[i].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                        if (document.querySelector(".passengers-notices-content").getElementsByClassName("package-info-item")[i].querySelector(".necessary").value == "") {
                            document.querySelector(".passengers-notices-content").getElementsByClassName("package-info-item")[i].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                            document.querySelector(".passengers-notices-content").getElementsByClassName("package-info-item")[i].insertAdjacentHTML('beforeend', `<div class="description">أدخل التفاصيل.</div>`);
                            isExist = false;
                        }
                    };
                }
            };
            if (isExist) {
                var exit_dateMs = document.querySelector(".exitDateMs").value;
                var exit_dateMs_date = new Date(exit_dateMs);
                for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                    if (document.querySelector(".main-container").getAttribute("data-schemaid") != 139) {
                        var passenger_type = document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-type").value;
                        var birthday = document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").value;
                        var birthday_date = new Date(birthday);
                        // ADDED FOR DATE VALIDATION
                        var birth_parts = birthday.split('-');
                        var check_year = parseInt(birth_parts[0], 10);
                        var check_month = parseInt(birth_parts[1], 10);
                        var check_day = parseInt(birth_parts[2], 10);
                        if (isNaN(check_year) || isNaN(check_month) || isNaN(check_day)) {
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                            isValid = false;
                        } else if (check_month < 1 || check_month > 12) {
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                            isValid = false;
                        } else if (check_day < 1 || check_day > new Date(check_year, check_month, 0).getDate()) {
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                            isValid = false;
                        } else if (isNaN(birthday_date.getTime())) {
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                            isValid = false;
                        } else {
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelectorAll(".description").forEach((desc) => {
                                desc.remove();
                            })
                            var cms_date = document.getElementById("cms-date").value;
                            var a = "";
                            cms_date.split("/").forEach(function (x) {
                                x.length >= 2 ? a += x : a += ("0" + x);
                                a += "-";
                            })
                            a = a.substr(0, a.length - 1);
                            date = a.split("-");
                            date = date[2] + "-" + date[0] + "-" + date[1];
                            var current_date = new Date(date);
                            if(document.querySelector(".main-container").getAttribute("data-schemaid") == 290){
                                const returnInfoSection = document.querySelector('.returninfoRoutesInfo');
                                if (returnInfoSection) {
                                    const firstInput = returnInfoSection.querySelector('input.EnNum_date_flight');
                                    if (firstInput) {
                                        var flight_return = firstInput.value;
                                        const flight_date_Object = new Date(flight_return);
                                        const flight_date = flight_date_Object.getTime();
                                        var time_diff = flight_date - birthday_date.getTime();
                                    } 
                                }
                            }else if(document.querySelector(".main-container").getAttribute("data-schemaid") == 291){
                                var flight_departure = document.querySelector(".exitDateMs").value;
                                const flight_date_Object = new Date(flight_departure);
                                const flight_date = flight_date_Object.getTime();
                                var time_diff = flight_date - birthday_date.getTime();
                            }else if(document.querySelector(".main-container").getAttribute("data-schemaid") == 292){
                                const route = document.querySelectorAll('.rout-details-part');
                                if (route.length > 0) {
                                    var flight_departure = route[route.length - 2].querySelector(".departure_date_flight").value;
                                    console.log("flight_departure2="+flight_departure)
                                    const flight_date_Object = new Date(flight_departure);
                                    const flight_date = flight_date_Object.getTime();
                                    var time_diff = flight_date - birthday_date.getTime();
                                }
                            }else{
                                var time_diff = current_date.getTime() - birthday_date.getTime();
                            }
                            var days_diff = Math.ceil(time_diff / (1000 * 3600 * 24));
                            var tmp = (Math.floor(days_diff / 365));
                            if (passenger_type == 2) {
                                if (tmp < 12 || tmp > 98) {

                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">للبالغين، أدخل تاريخ ميلاد صالحًا</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");
                                }
                            } else if (passenger_type == 1) {
                                if (tmp < 2 || tmp > 12) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخ ميلاد صالحًا للطفل</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");
                                }
                            } else if (passenger_type == 0) {
                                if (tmp < 0 || tmp > 2) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخ ميلاد صالحًا للرضیع</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");
                                }
                            };
                        }

                    };

                    if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate")) {
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").classList.contains("necessary")) {
                            var passexpiredate = document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").value;
                            var passexpiredate_date = new Date(passexpiredate);

                            // ADDED FOR DATE VALIDATION
                            var expiredate_parts = passexpiredate.split('-');
                            var check_year = parseInt(expiredate_parts[0], 10);
                            var check_month = parseInt(expiredate_parts[1], 10);
                            var check_day = parseInt(expiredate_parts[2], 10);
                            if (isNaN(check_year) || isNaN(check_month) || isNaN(check_day)) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else if (check_month < 1 || check_month > 12) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else if (check_day < 1 || check_day > new Date(check_year, check_month, 0).getDate()) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else if (isNaN(passexpiredate_date.getTime())) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelectorAll(".description").forEach((desc) => {
                                    desc.remove();
                                })
                                var time_diff = passexpiredate_date.getTime() - exit_dateMs_date.getTime();
                                var days_diff = Math.ceil(time_diff / (1000 * 3600 * 24));
                                if (days_diff < 183) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يكون تاريخ انتهاء جواز السفر أكثر من 6 أشهر.</div>`);
                                    isValid = false;

                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");

                                }
                            }

                        };
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode")) {
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").classList.contains("necessary")) {
                            var passportcode = document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").value;
                            var regex = /^[a-zA-Z]{1}[0-9]{8}$/;
                            if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".issuecountry")) {
                                if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".issuecountry").value == 1002236) {
                                    if (!regex.test(passportcode)) {
                                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم جواز السفر غير صحيح.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.remove("invalid");
                                    }
                                }

                            } else {
                                if (!regex.test(passportcode)) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم جواز السفر غير صحيح.</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.remove("invalid");
                                }
                            }


                        };
                    };

                    if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode")) {
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").classList.contains("necessary")) {
                            var NationalCode = document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").value;


                            var checkArray = 0;
                            for (j = 0; j < 10; j++) {
                                if (NationalCode[0] == NationalCode[j]) {
                                    checkArray++
                                }
                            }
                            if (checkArray < 10) {

                                var check = parseFloat(NationalCode[9]);
                                var sum = 0;
                                var index;
                                for (index = 0; index < 9; index++) {
                                    sum += parseFloat(NationalCode[index]) * (10 - index);
                                }
                                sum %= 11;
                                if ((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".inner-item").classList.remove("invalid");
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم الهویة الوطنية غير صحيح.</div>`);
                                    isValid = false;
                                }
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم الهویة الوطنية غير صحيح.</div>`);
                                isValid = false;
                            }

                        }
                    };
                    for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english").length; j++) {
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].value.length < 2) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 2.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.remove("invalid");
                            }
                            var regex = new RegExp("^[a-zA-Z ]+$");
                            if (!regex.test(document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].value)) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description"> تم إدخال حرف غير قانوني.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        }
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[0]) {
                        for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY ").length; j++) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].classList.contains("necessary")) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].getAttribute("data-value") == '') {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">اختر البلد.</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".inner-item").classList.remove("invalid");
                                }
                            }
                        }
                    };

                }
                if (isValid) {
                    if (document.querySelector(".passengers-notices-content")) {
                        document.querySelector(".passengers-notices-content").querySelector(".package-number-items").querySelector(".mobile-info").value = document.querySelector(".passengers-notices-content").querySelector(".package-number-items").querySelector(".mobile").closest(".package-number-items").querySelector(".code").value + document.querySelector(".passengers-notices-content").querySelector(".package-number-items").querySelector(".mobile").value;
                        document.querySelector(".passengers-notices-content").classList.add("unvisible");
                    }
                    if (document.querySelector(".main-userid").value == 0) {
                        // updated login 
                        showLoginContainer();
                    } else {
                        document.querySelector(".passengers-info-content").classList.add("unvisible");
                        document.querySelector(".buyers-info-content").classList.remove("unvisible");
                        document.querySelector(".step-title").innerText = 'بیانات المشتري';
                        element.setAttribute("data-step", "buyer");
                        element.previousElementSibling.classList.remove("unvisible");
                        element.previousElementSibling.setAttribute("data-step", "buyer");
                        check_steps("buyer");
                        // updated login 
                        if (document.querySelector(".buyers-info-content").getAttribute("data-load") == 0) {
                            $bc.setSource("db.runBuyer", {
                                userid: document.querySelector(".main-userid").value,
                                provider: document.querySelector(".provider").value,
                                run: true
                            })
                        }



                    }




                };
            }
        } else if (element.getAttribute("data-step") == "buyer") {
            var isExist = true;
            var isValid = true;
            // updated login 
            var isVerify = true;
            for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description").remove();
                    };
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary")) {
                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").value == "") {
                            document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل بیانات المشتري.</div>`);
                            isExist = false;
                        }
                    };
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")) {
                        for (var y = 0; y < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items").length; y++) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code")) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").closest(".inner-item").classList.remove("invalid");
                            };
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").value == "") {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").closest(".inner-item").classList.add("invalid");
                                    isExist = false;
                                }
                            }
                        }
                    };
                };
            };
            if (isExist) {
                if (document.querySelector(".buyer-1")) {
                    if (!document.querySelector(".agency-content").classList.contains("unvisible")) {
                        if (document.querySelector(".selected-agency").getAttribute("data-agencyid") == '' || !document.querySelector(".selected-agency").getAttribute("data-agencyid")) {
                            isValid = false;
                            document.querySelector(".selected-agency").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">قم باختيار الوكالة المطلوبة من القائمة المقترحة.</div>`);
                        }

                    }
                }
                for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].value.length < 2) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 2 - قم بالتحرير في لوحة المستخدم.</div>`);
                                isValid = false;

                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].classList.contains("necessary")) {
                            var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                            if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].value)) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">البرید الإلکتروني  غير صحيح.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].value.length < 5) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 5.</div>`);
                                isValid = false;

                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").classList.contains("necessary")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".package-number-items").querySelector(".code").value == '+98') {
                                    var regex = /^[1-9][0-9]{9,10}$/;
                                    if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value)) {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("buyer-info-content")[i].querySelector(".tel").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يبدأ الخط الأرضي برمز المدينة.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };
                        };
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").classList.contains("necessary")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".package-number-items").querySelector(".code").value == '+98') {
                                    var regex = /^9([0123645789]{9})$/;
                                    if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").value)) {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("buyer-info-content")[i].querySelector(".mobile").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يبدأ الهاتف الخليوي بـ 9 أرقام ولا يتجاوز 10 أرقام.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };

                        }

                    };
                }
                if (isValid) {
                    // updated login 
                    document.querySelector(".check-has-data").querySelectorAll("input").forEach(e => {
                        if (e.dataset.verify) {
                            if (e.dataset.verify == 'false') {
                                if (document.querySelector(".verify-request-container").classList.contains("verify-request-container-toggle")) {
                                    document.querySelector(".verify-request-container").classList.toggle("verify-request-container-toggle");
                                }
                                isVerify = false;
                                if (e.classList.contains("email")) {

                                    document.querySelector(".email-verify-container").classList.remove("unvisible");
                                    document.querySelector(".email-verify-container").querySelector(".email-verify").value = e.value;

                                }
                                if (e.classList.contains("mobile")) {

                                    document.querySelector(".mobile-verify-container").classList.remove("unvisible");
                                    document.querySelector(".mobile-verify-container").querySelector(".mobile-verify").value = e.value;
                                    document.querySelector(".mobile-verify-container").querySelector(".code-verify-container").classList.add("unvisible");
                                    document.querySelector(".mobile-verify-container").querySelector(".btn-item").dataset.type = `verifyrequest`;
                                    document.querySelector(".mobile-verify-container").querySelector(".btn-item").innerHTML = `ارسال کد`;
                                }
                            } else {

                            }
                        }
                    });
                    if (isVerify) {


                        for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                            for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash").length; j++) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash")[j].value == '') {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash")[j].value = '-'
                                }
                            }
                        };

                        document.querySelector(".buyers-info-content").classList.add("unvisible");
                        if (document.querySelector(".transfer-info-content")) {
                            document.querySelector(".touristpanel-info-content").classList.remove("unvisible");
                            document.querySelector(".step-title").innerText = 'الخدمة والدورية';
                            element.setAttribute("data-step", "touristpanel");
                            element.previousElementSibling.setAttribute("data-step", "touristpanel");
                            check_steps("touristpanel");
                        } else {
                            document.querySelector(".summary-info-content").classList.remove("unvisible");
                            document.querySelector(".step-title").innerText = 'الدفع والإصدار';
                            element.setAttribute("data-step", "summary");
                            element.previousElementSibling.setAttribute("data-step", "summary");
                            check_steps("summary");
                        }
                        document.querySelector(".summary-passenger-items").innerHTML = "";
                        document.querySelector(".summary-buyer-items").innerHTML = "";
                        for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                            for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items").length; j++) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel")) {
                                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value == "-") {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = "-";

                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value;
                                    }
                                }
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile")) {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").value;
                                }
                            }
                        };





                        // updated login
                        const properties = new Array()
                        document.querySelector(".check-has-data").querySelectorAll("input").forEach(e => {
                            if (e.dataset.changed) {
                                if (e.dataset.changed == 1) {
                                    if (e.dataset.id) {
                                        var obj = `{
  "${e.dataset.id ? "edited" : "added"}": [
  {
  ${e.dataset.id ? `"id":${e.dataset.id},` : ``}
  "parts": [
      {
          "part": 1,
          "values": [
              {
                  ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
                  "value": "${e.value}"
              }
          ]
      }
  ]
  }
  ],
  "multi": false,
  "propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
  }`


                                        properties.push(JSON.parse(obj));
                                    } else {
                                        if (e.dataset.prpid !== '3' && e.dataset.prpid !== '5') {
                                            var obj = `{
  "${e.dataset.id ? "edited" : "added"}": [
  {
  ${e.dataset.id ? `"id":${e.dataset.id},` : ``}
  "parts": [
      {
          "part": 1,
          "values": [
              {
                  ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
                  "value": "${e.value}"
              }
          ]
      }
  ]
  }
  ],
  "multi": false,
  "propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
  }`


                                            properties.push(JSON.parse(obj));
                                        }

                                    }




                                }
                            }


                        })
                        if (properties.length > 0) {
                            var objEditUser = `{
                  "data": {
                  "lid": 3,
                  "paramUrl": "/${document.querySelector(".check-has-data").dataset.hashid}/ar/schema_name",
                  "properties": ${JSON.stringify(properties)},
                  "schemaId": "${document.querySelector(".check-has-data").dataset.hashid}",
                  "schemaVersion": "1.0.0",
                  "usedForId": ${document.querySelector(".main-userid").value}
              }}`
                            $bc.setSource("db.editUser", {
                                objEditUser: objEditUser,
                                rkey: document.querySelector(".main-rkey").value,
                                run: true
                            })
                        };

                        for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                            if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile")) {
                                var mobile_info = "";
                                if (document.querySelector(".buyer-3")) {
                                    mobile_info = document.querySelector(".buyer-3").querySelector(".mobile-info").value;
                                } else if (document.querySelector(".buyer-2")) {
                                    mobile_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".mobile-info").value;
                                }
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code1").value = mobile_info.substr(0, 3);
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code2").value = mobile_info.substr(3, 3);
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code3").value = mobile_info.substr(6, 7);
                            }
                            if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email")) {
                                var email_info = "";
                                if (document.querySelector(".buyer-3")) {
                                    email_info = document.querySelector(".buyer-3").querySelector(".email").value;
                                } else if (document.querySelector(".buyer-2")) {
                                    email_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".email").value;
                                }
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email").querySelector("input").value = email_info;
                            }
                        };

                        for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                            var element = document.createElement("div");
                            element.className = "t-bodys";
                            for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                                if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].classList.contains("unvisible")) {
                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]")) {
                                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('passportexpiration') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthdate') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthday') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('passportIssueDate') > -1) {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").value}</div>`;
                                            element.appendChild(element_child);
                                        } else {
                                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].classList.contains("section_extra_service")) {
                                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".extra_service_id_value_final")) {
                                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".extra_service_id_value_final").value !== '') {
                                                        var element_child = document.createElement("div");
                                                        element_child.className = "d-item";
                                                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".extra_service_text").innerText}</div>`;
                                                        element.appendChild(element_child);
                                                    }
                                                }
                                            } else {
                                                var element_child = document.createElement("div");
                                                element_child.className = "d-item";
                                                element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                                element.appendChild(element_child);
                                            }
                                        }
                                    } else {
                                        var element_child = document.createElement("div");
                                        element_child.className = "d-item";
                                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                        element.appendChild(element_child);
                                    }
                                }
                            };
                            document.querySelector(".summary-passenger-items").appendChild(element);
                        };
                        var element = document.createElement("div");
                        element.className = "t-bodys";
                        for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item").length; j++) {
                            if (!document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].classList.contains("unvisible")) {
                                if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]")) {
                                    if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name")) {
                                        if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('mobile') > -1 || document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('tel') > -1) {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray dir-ltr">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").value}</div>`;
                                            element.appendChild(element_child);
                                        } else {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                            element.appendChild(element_child);
                                        }
                                    }

                                } else if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText !== 'قم باختيار الوكالة المطلوبة') {
                                    var element_child = document.createElement("div");
                                    element_child.className = "d-item";
                                    element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                    element.appendChild(element_child);
                                }
                            }
                        }
                        document.querySelector(".summary-buyer-items").appendChild(element);
                        if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4824 || document.querySelector(".main-container").getAttribute("data-dmnid") == 2475) {
                            $.post('/Client_Check_Member_Point_Ar_ver.2.bc', {
                                userid: document.querySelector(".main-userid").value,
                                product_data: document.querySelector(".coupon_data").value,
                                provider_id: document.querySelector(".provider").value,
                                schemaid: document.querySelector(".main-container").getAttribute("data-schemaid")
                            }, function (response) {
                                if (document.querySelector(".member-point-container").querySelector("#ballsWaveG")) {
                                    document.querySelector(".member-point-container").querySelector("#ballsWaveG").remove();
                                };
                                $(".member-point-container").show().html(response);
                            });
                        };

                        if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 3812 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4204 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4787 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4705) {

                            $(".counter-content").show();
                            document.querySelector(".counter-content").classList.add('is-necessary')
                        }
                    }
                }
            }
        } else if (element.getAttribute("data-step") == "touristpanel") {
            var isExist = true;
            var isValid = true;
            for (var i = 0; i < document.getElementsByClassName("transfer-info-content").length; i++) {
                for (var j = 0; j < document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                    if (document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                        document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelectorAll(".description").forEach((desc) => {
                            desc.remove();
                        })
                    };
                    if (document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary")) {
                        document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelectorAll(".necessary").forEach((necessary) => {
                            necessary.closest(".inner-item").classList.remove("invalid");
                            if (necessary.value == "") {
                                necessary.closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل تفاصيل الخدمة.</div>`);
                                isExist = false;
                            }
                        });
                    };
                };
            };
            if (isExist) {
                for (var i = 0; i < document.getElementsByClassName("transfer-info-content").length; i++) {
                    for (var j = 0; j < document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("address-item").length; j++) {
                        if (document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("address-item")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("address-item")[j].value.length < 5) {
                                document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("address-item")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("address-item")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 5.</div>`);
                                isValid = false;

                            } else {
                                document.getElementsByClassName("transfer-info-content")[i].getElementsByClassName("address-item")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };

                    };

                    document.getElementsByClassName("transfer-info-content")[i].querySelectorAll(".transfer-hour").forEach((thour) => {
                        var starttimeid = thour.closest(".transfer-info-content").querySelector(".starttimeid").value;
                        var starttime = thour.closest(".transfer-info-content").querySelector(".starttime").value;
                        var endtimeid = thour.closest(".transfer-info-content").querySelector(".endtimeid").value;
                        var endtime = thour.closest(".transfer-info-content").querySelector(".endtime").value;
                        var hour = thour.value;
                        hour = hour.split(":")
                        H = hour[0] * 3600;
                        H = parseFloat(H)
                        M = hour[1] * 60;
                        M = parseFloat(M)
                        if (hour[2] == undefined) {
                            S = 0
                        } else {
                            S = hour[2];
                            S = parseFloat(S)
                        }
                        var END = H + M + S
                        if (starttimeid > endtimeid) {
                            if (!(END >= starttimeid || END == 0 || END <= endtimeid)) {
                                thour.closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">time should be between ` + starttime + `and ` + endtime + `!</div>`);
                                isValid = false;
                            } else {
                                thour.closest(".inner-item").classList.remove("invalid");
                            }
                        } else {
                            if (!(starttimeid <= END && END <= endtimeid)) {
                                thour.closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">time should be between ` + starttime + `and ` + endtime + `!</div>`);
                                isValid = false;
                            } else {
                                thour.closest(".inner-item").classList.remove("invalid");
                            }

                        }

                    })
                }
                if (isValid) {
                    if (document.querySelector(".transfer-info-content")) {
                        document.querySelector(".touristpanel-info-content").classList.add("unvisible");
                        document.querySelector(".summary-info-content").classList.remove("unvisible");
                    } else {
                        document.querySelector(".buyers-info-content").classList.add("unvisible");
                        document.querySelector(".summary-info-content").classList.remove("unvisible");
                    }
                    element.previousElementSibling.setAttribute("data-step", "summary");
                    document.querySelector(".step-title").innerText = 'الدفع والإصدار';
                    element.setAttribute("data-step", "summary");

                    check_steps("summary");
                    document.querySelector(".summary-passenger-items").innerHTML = "";
                    document.querySelector(".summary-buyer-items").innerHTML = "";

                    for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                        for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items").length; j++) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value == "-") {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = "-";
                                } else {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value;
                                }
                            }
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile")) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").value;
                            }
                        }
                    };

                    // updated login
                    const properties = new Array()
                    document.querySelector(".check-has-data").querySelectorAll("input").forEach(e => {
                        if (e.dataset.changed) {
                            if (e.dataset.changed == 1) {
                                if (e.dataset.id) {
                                    var obj = `{
"${e.dataset.id ? "edited" : "added"}": [
{
${e.dataset.id ? `"id":${e.dataset.id},` : ``}
"parts": [
    {
        "part": 1,
        "values": [
            {
                ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
                "value": "${e.value}"
            }
        ]
    }
]
}
],
"multi": false,
"propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
}`


                                    properties.push(JSON.parse(obj));
                                } else {
                                    if (e.dataset.prpid !== '3' && e.dataset.prpid !== '5') {
                                        var obj = `{
"${e.dataset.id ? "edited" : "added"}": [
{
${e.dataset.id ? `"id":${e.dataset.id},` : ``}
"parts": [
    {
        "part": 1,
        "values": [
            {
                ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
                "value": "${e.value}"
            }
        ]
    }
]
}
],
"multi": false,
"propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
}`


                                        properties.push(JSON.parse(obj));
                                    }

                                }




                            }
                        }


                    })
                    if (properties.length > 0) {
                        var objEditUser = `{
                "data": {
                "lid": 3,
                "paramUrl": "/${document.querySelector(".check-has-data").dataset.hashid}/ar/schema_name",
                "properties": ${JSON.stringify(properties)},
                "schemaId": "${document.querySelector(".check-has-data").dataset.hashid}",
                "schemaVersion": "1.0.0",
                "usedForId": ${document.querySelector(".main-userid").value}
            }}`
                        $bc.setSource("db.editUser", {
                            objEditUser: objEditUser,
                            rkey: document.querySelector(".main-rkey").value,
                            run: true
                        })
                    };

                    for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile")) {
                            var mobile_info = "";
                            if (document.querySelector(".buyer-3")) {
                                mobile_info = document.querySelector(".buyer-3").querySelector(".mobile-info").value;
                            } else if (document.querySelector(".buyer-2")) {
                                mobile_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".mobile-info").value;
                            }
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code1").value = mobile_info.substr(0, 3);
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code2").value = mobile_info.substr(3, 3);
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code3").value = mobile_info.substr(6, 7);
                        }
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email")) {
                            var email_info = "";
                            if (document.querySelector(".buyer-3")) {
                                email_info = document.querySelector(".buyer-3").querySelector(".email").value;
                            } else if (document.querySelector(".buyer-2")) {
                                email_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".email").value;
                            }
                            document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email").querySelector("input").value = email_info;
                        }
                    };
                    for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                        var element = document.createElement("div");
                        element.className = "t-bodys";
                        for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                            if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].classList.contains("unvisible")) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]")) {
                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('passportexpiration') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthdate') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthday') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('passportIssueDate') > -1) {
                                        var element_child = document.createElement("div");
                                        element_child.className = "d-item";
                                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").value}</div>`;
                                        element.appendChild(element_child);
                                    } else {
                                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].classList.contains("section_extra_service")) {
                                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".extra_service_id_value_final")) {
                                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".extra_service_id_value_final").value !== '') {
                                                    var element_child = document.createElement("div");
                                                    element_child.className = "d-item";
                                                    element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".extra_service_text").innerText}</div>`;
                                                    element.appendChild(element_child);
                                                }
                                            }
                                        } else {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                            element.appendChild(element_child);
                                        }
                                    }
                                } else {
                                    var element_child = document.createElement("div");
                                    element_child.className = "d-item";
                                    element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                    element.appendChild(element_child);
                                }
                            }
                        };
                        document.querySelector(".summary-passenger-items").appendChild(element);
                    };
                    var element = document.createElement("div");
                    element.className = "t-bodys";
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item").length; j++) {
                        if (!document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].classList.contains("unvisible")) {
                            if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]")) {
                                if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name")) {
                                    if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('mobile') > -1 || document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('tel') > -1) {
                                        var element_child = document.createElement("div");
                                        element_child.className = "d-item";
                                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray dir-ltr">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").value}</div>`;
                                        element.appendChild(element_child);
                                    } else {
                                        var element_child = document.createElement("div");
                                        element_child.className = "d-item";
                                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                        element.appendChild(element_child);
                                    }
                                }

                            } else if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText !== 'قم باختيار الوكالة المطلوبة') {
                                var element_child = document.createElement("div");
                                element_child.className = "d-item";
                                element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                element.appendChild(element_child);
                            }
                        }
                    }
                    document.querySelector(".summary-buyer-items").appendChild(element);
                    if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4824 || document.querySelector(".main-container").getAttribute("data-dmnid") == 2475) {
                        $.post('/Client_Check_Member_Point_Ar_ver.2.bc', {
                            userid: document.querySelector(".main-userid").value,
                            product_data: document.querySelector(".coupon_data").value,
                            provider_id: document.querySelector(".provider").value,
                            schemaid: document.querySelector(".main-container").getAttribute("data-schemaid")
                        }, function (response) {
                            if (document.querySelector(".member-point-container").querySelector("#ballsWaveG")) {
                                document.querySelector(".member-point-container").querySelector("#ballsWaveG").remove();
                            };
                            $(".member-point-container").show().html(response);
                        });
                    };

                    if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 3812 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4204 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4787 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4705) {

                        $(".counter-content").show();
                        document.querySelector(".counter-content").classList.add('is-necessary')
                    }

                }
            }
        } else if (element.getAttribute("data-step") == "summary") {
            if (document.querySelector(".rule-condition-content").querySelector(".description")) {
                document.querySelector(".rule-condition-content").querySelector(".description").remove();
            };
            if (document.querySelector(".counter-content").querySelector(".description")) {
                document.querySelector(".counter-content").querySelector(".description").remove();
            };
            var isValid = true;
            if (!document.querySelector(".rule-condition-content").querySelector("input[type=checkbox]").checked) {
                document.querySelector(".rule-condition-content").insertAdjacentHTML('beforeend',
                    `<div class="description">یرجی مطالعة قسم القوانين</div>`);
                isValid = false;
            } else {
                if (document.querySelector(".rule-condition-content").querySelector(".description")) {
                    document.querySelector(".rule-condition-content").querySelector(".description").remove();
                }
            }
            if (document.querySelector(".counter-content").classList.contains("is-necessary")) {
                if (document.querySelector(".counter-content").querySelector(".name").value == "") {
                    document.querySelector(".counter-content").insertAdjacentHTML('beforeend',
                        `<div class="description">الرجاء تحديد عداد المشغل</div>`);
                    isValid = false;
                } else {
                    if (document.querySelector(".counter-content").querySelector(".description")) {
                        document.querySelector(".counter-content").querySelector(".description").remove();
                    }
                }
            };
            if (isValid) {
                document.querySelector(".summary-invoice").classList.remove("unvisible");
                document.querySelector(".invoice-container").innerHTML = `<div id="ballsWaveG"> <div id="ballsWaveG_1" class="ballsWaveG"></div><div id="ballsWaveG_2" class="ballsWaveG"></div><div id="ballsWaveG_3" class="ballsWaveG"></div><div id="ballsWaveG_4" class="ballsWaveG"></div><div id="ballsWaveG_5" class="ballsWaveG"></div><div id="ballsWaveG_6" class="ballsWaveG"></div> <div id="ballsWaveG_7" class="ballsWaveG"></div><div id="ballsWaveG_8" class="ballsWaveG"></div> </div>`
                if (document.querySelector(".Credit_payment")) {
                    if (document.querySelector(".Credit_payment").value == 1) {
                        credit_payment();
                    };
                }
                if (document.querySelector("input[name=share]").value == 1) {
                    document.querySelector(".invoice-container").innerHTML = `<div class="invoice-content preInvoice" data-clicked="0" onclick="check_invoice(this,'preInvoice')">انقر لتسجيل العقد المسبق</div>`;
                    document.querySelector("input[name=bank_id]").value = -1;
                } else {
                    if (document.querySelector("input[name=accounttype]").value == 1) {
                        document.querySelector(".invoice-container").innerHTML = `<div class="invoice-content preInvoice" data-clicked="0" onclick="check_invoice(this,'preInvoice')">انقر لتسجيل العقد المسبق وإرساله إلى قسم المحاسبة</div>`;
                    } else {
                        $.post('/Client_Bank_List_Ar_ver.2.bc', {
                            firstpay: document.querySelector(".firstpay-price").innerText,
                        }, function (response) {
                            if (document.querySelector(".invoice-container").querySelector("#ballsWaveG")) {
                                document.querySelector(".invoice-container").querySelector("#ballsWaveG").remove();
                            };
                            $(".invoice-container").append(response);
                        });
                    }

                }

            }



        }
    } else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 251 || document.querySelector(".main-container").getAttribute("data-schemaid") == 290251 || document.querySelector(".main-container").getAttribute("data-schemaid") == 249) {
        if (element.getAttribute("data-step") == "passenger") {
            var isExist = true;
            var isValid = true;
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                for (var s = 0; s < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger").length; s++) {
                    for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item").length; j++) {
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].querySelector(".description").remove();
                        };
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].querySelector(".necessary")) {
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].querySelector(".necessary").value == "") {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل تفاصيل الركاب</div>`);
                                isExist = false;
                            }
                        };
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")) {
                            for (var y = 0; y < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item").length; y++) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary")) {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                                };
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary")) {
                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").value == "") {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                        isExist = false;
                                    } else {

                                        if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").getAttribute("data-id") && document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").getAttribute("data-id") == "") {
                                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                            isExist = false;
                                        }
                                    }
                                }
                            }
                        };


                    };
                }

            };

            if (isExist) {
                const rooms = JSON.parse(document.querySelector(".invoice-form").querySelector("input[name=roomSearch]").value);
                var exit_dateMs = document.querySelector(".exitDateMs").value;
                var exit_dateMs_date = new Date(exit_dateMs);
                for (var i = 0; i < rooms.rooms.length; i++) {
                    var child_count_age = rooms.rooms[i].childcountandage;
                    var child_age_wb = "";
                    var child_age_wob = "";
                    var infant_age = "";
                    var adult_count = "";
                    var adult = "";
                    var child_count_age_splited = child_count_age.split(',');
                    for (var j = 1; j < child_count_age_splited.length; j++) {
                        if (child_count_age_splited[j] > 2 && child_count_age_splited[j] <= 6) {
                            child_age_wob = child_age_wob += child_count_age_splited[j] + ',';
                        } else if (child_count_age_splited[j] > 6 && child_count_age_splited[j] <= 12) {
                            child_age_wb = child_age_wb += child_count_age_splited[j] + ',';
                        } else if (child_count_age_splited[j] >= 1 && child_count_age_splited[j] <= 2) {
                            infant_age = infant_age += child_count_age_splited[j] + ',';
                        }
                    }
                    if (child_age_wob == "" && infant_age == "") {
                        child_age_wb = child_age_wb.slice(0, -1);
                    }
                    if (infant_age == "") {
                        child_age_wob = child_age_wob.slice(0, -1);
                    }
                    infant_age = infant_age.slice(0, -1);
                    var adult_count = rooms.rooms[i].adultcount;
                    for (var x = 0; x < adult_count; x++) {
                        adult += '0,';
                    }
                    var passengers_age = adult + child_age_wb + child_age_wob + infant_age;
                    var passengers_age_splited = passengers_age.split(',');
                    for (var y = 0; y < passengers_age_splited.length; y++) {
                        if (passengers_age_splited[y] > 0) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[y].querySelector(".birthday")) {
                                var birthdate = document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[y].querySelector(".birthday").value;
                                var birthdate_replaced = birthdate.replace(/-/g, '');
                                var exit_dateMs_replaced = exit_dateMs.replace(/-/g, '');
                                var check_birthdate = (parseFloat(exit_dateMs_replaced) - parseFloat(birthdate_replaced)) / 10000;
                                if (check_birthdate <= parseFloat(passengers_age_splited[y]) && check_birthdate > parseFloat(
                                    passengers_age_splited[y] - 1)) {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[y].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[y].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[y].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[y].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[y].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[y].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[y].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يتراوح عمر الطفل بين ${parseFloat(passengers_age_splited[y] - 1)} و  ${passengers_age_splited[y]} سنوات</div>`);
                                    isValid = false;

                                }
                            }
                        }
                    }
                }
                for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                    for (var s = 0; s < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger").length; s++) {
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday")) {
                            var passenger_type = document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".type").value;
                            var birthday = document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").value;
                            var birthday_date = new Date(birthday);
                            // ADDED FOR DATE VALIDATION
                            var birth_parts = birthday.split('-');
                            var check_year = parseInt(birth_parts[0], 10);
                            var check_month = parseInt(birth_parts[1], 10);
                            var check_day = parseInt(birth_parts[2], 10);
                            if (isNaN(check_year) || isNaN(check_month) || isNaN(check_day)) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                                isValid = false;
                            } else if (check_month < 1 || check_month > 12) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                                isValid = false;
                            } else if (check_day < 1 || check_day > new Date(check_year, check_month, 0).getDate()) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                                isValid = false;
                            } else if (isNaN(birthday_date.getTime())) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelectorAll(".description").forEach((desc) => {
                                    desc.remove();
                                })
                                var cms_date = document.getElementById("cms-date").value;
                                var a = "";
                                cms_date.split("/").forEach(function (x) {
                                    x.length >= 2 ? a += x : a += ("0" + x);
                                    a += "-";
                                })
                                a = a.substr(0, a.length - 1);
                                date = a.split("-");
                                date = date[2] + "-" + date[0] + "-" + date[1];
                                var current_date = new Date(date);
                                if(document.querySelector(".main-container").getAttribute("data-schemaid") == 290251){
                                    const returnInfoSection = document.querySelector('.returninfoRoutesInfo');
                                if (returnInfoSection) {
                                    const firstInput = returnInfoSection.querySelector('input.EnNum_date_flight');
                                    if (firstInput) {
                                        var flight_return = firstInput.value;
                                        const flight_date_Object = new Date(flight_return);
                                        const flight_date = flight_date_Object.getTime();
                                        var time_diff = flight_date - birthday_date.getTime();
                                    } 
                                }
                                }else{
                                    var time_diff = current_date.getTime() - birthday_date.getTime();
                                }
                                var days_diff = Math.ceil(time_diff / (1000 * 3600 * 24));
                                var tmp = (Math.floor(days_diff / 365));
                                if (passenger_type == 2) {
                                    if (tmp < 12 || tmp > 98) {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">للبالغين، أدخل تاريخ ميلاد صالحًا</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            }

                        };
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate")) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").classList.contains("necessary")) {
                                var passexpiredate = document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").value;
                                var passexpiredate_date = new Date(passexpiredate);
                                // ADDED FOR DATE VALIDATION
                                var expiredate_parts = passexpiredate.split('-');
                                var check_year = parseInt(expiredate_parts[0], 10);
                                var check_month = parseInt(expiredate_parts[1], 10);
                                var check_day = parseInt(expiredate_parts[2], 10);
                                if (isNaN(check_year) || isNaN(check_month) || isNaN(check_day)) {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                                    isValid = false;
                                } else if (check_month < 1 || check_month > 12) {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                                    isValid = false;
                                } else if (check_day < 1 || check_day > new Date(check_year, check_month, 0).getDate()) {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                                    isValid = false;
                                } else if (isNaN(passexpiredate_date.getTime())) {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelectorAll(".description").forEach((desc) => {
                                        desc.remove();
                                    })
                                    var time_diff = passexpiredate_date.getTime() - exit_dateMs_date.getTime();
                                    var days_diff = Math.ceil(time_diff / (1000 * 3600 * 24));
                                    if (days_diff < 183) {

                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يكون تاريخ انتهاء جواز السفر أكثر من 6 أشهر.</div>`);
                                        isValid = false;

                                    } else {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");

                                    }
                                }

                            };
                        };
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passportcode")) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passportcode").classList.contains("necessary")) {
                                var passportcode = document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passportcode").value;
                                var regex = /^[a-zA-Z]{1}[0-9]{8}$/;
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".issuecountry")) {
                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".issuecountry").value == 1002236) {
                                        if (!regex.test(passportcode)) {
                                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passportcode").closest(".inner-item").classList.add("invalid");
                                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passportcode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم جواز السفر غير صحيح.</div>`);
                                            isValid = false;
                                        } else {
                                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passportcode").closest(".inner-item").classList.remove("invalid");
                                        }
                                    }

                                } else {
                                    if (!regex.test(passportcode)) {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passportcode").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passportcode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم جواز السفر غير صحيح.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".passportcode").closest(".inner-item").classList.remove("invalid");
                                    }
                                }

                            };
                        };
                        // add if start
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".NationalCode")) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".NationalCode").classList.contains("necessary")) {
                                var NationalCode = document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".NationalCode").value;


                                var checkArray = 0;
                                for (j = 0; j < 10; j++) {
                                    if (NationalCode[0] == NationalCode[j]) {
                                        checkArray++
                                    }
                                }
                                if (checkArray < 10) {

                                    var check = parseFloat(NationalCode[9]);
                                    var sum = 0;
                                    var index;
                                    for (index = 0; index < 9; index++) {
                                        sum += parseFloat(NationalCode[index]) * (10 - index);
                                    }
                                    sum %= 11;
                                    if ((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)) {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".NationalCode").closest(".inner-item").classList.remove("invalid");
                                    } else {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".NationalCode").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".NationalCode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم الهویة الوطنية غير صحيح.</div>`);
                                        isValid = false;
                                    }
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".NationalCode").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".NationalCode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم الهویة الوطنية غير صحيح.</div>`);
                                    isValid = false;
                                }

                            };
                        };
                        // add if end
                        // add if start
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")) {
                            for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english").length; j++) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")[j].classList.contains("necessary")) {
                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")[j].value.length < 2) {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")[j].closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 2.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")[j].closest(".inner-item").classList.remove("invalid");
                                    }
                                    var regex = new RegExp("^[a-zA-Z ]+$");
                                    if (!regex.test(document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")[j].value)) {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")[j].closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">تم إدخال حرف غير قانوني.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("english")[j].closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };
                        };
                        // add if end
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("autocompleteCOUNTRY")[0]) {
                            for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("autocompleteCOUNTRY").length; j++) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("autocompleteCOUNTRY")[j].classList.contains("necessary")) {
                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("autocompleteCOUNTRY")[j].getAttribute("data-value") == '') {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">اختر البلد.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };
                        }

                    }

                }

                if (isValid) {

                    let roomid = "";
                    for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                        roomid = roomid + '"' + document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[0].querySelector(".roomidHotel").value + '",';
                    };
                    document.querySelector("input[name=roomid]").value = roomid.slice(0, -1);

                    if (document.querySelector(".main-userid").value == 0) {
                        // updated login 
                        showLoginContainer();
                    } else {
                        document.querySelector(".passengers-info-content").classList.add("unvisible");
                        document.querySelector(".buyers-info-content").classList.remove("unvisible");
                        document.querySelector(".step-title").innerText = 'بیانات المشتري';
                        element.setAttribute("data-step", "buyer");
                        element.previousElementSibling.classList.remove("unvisible");
                        element.previousElementSibling.setAttribute("data-step", "buyer");
                        check_steps("buyer");
                        // updated login 
                        if (document.querySelector(".buyers-info-content").getAttribute("data-load") == 0) {
                            $bc.setSource("db.runBuyer", {
                                userid: document.querySelector(".main-userid").value,
                                provider: document.querySelector(".provider").value,
                                run: true
                            })
                        }

                        if (document.querySelector(".passengers-extraServices-content")) {
                            if (!document.querySelector(".passengers-extraServices-content").classList.contains("unvisible")) {
                                document.querySelector(".passengers-extraServices-content").classList.add("unvisible")
                            }
                        };

                    }




                };
            }
        } else if (element.getAttribute("data-step") == "buyer") {
            var isExist = true;
            var isValid = true;
            // updated login 
            var isVerify = true;
            for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description").remove();
                    };
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary")) {
                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").value == "") {
                            document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل بیانات المشتري.</div>`);
                            isExist = false;
                        }
                    };
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")) {
                        for (var y = 0; y < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items").length; y++) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code")) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").closest(".inner-item").classList.remove("invalid");
                            };
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").value == "") {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").closest(".inner-item").classList.add("invalid");
                                    isExist = false;
                                }
                            }
                        }
                    };







                };


            };

            if (isExist) {
                for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].value.length < 2) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 2 - قم بالتحرير في لوحة المستخدم.</div>`);
                                isValid = false;

                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].classList.contains("necessary")) {
                            var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                            if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].value)) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">البرید الإلکتروني  غير صحيح.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].value.length < 5) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 5.</div>`);
                                isValid = false;

                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").classList.contains("necessary")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".package-number-items").querySelector(".code").value == '+98') {
                                    var regex = /^[1-9][0-9]{9,10}$/;
                                    if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value)) {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("buyer-info-content")[i].querySelector(".tel").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يبدأ الخط الأرضي برمز المدينة.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };
                        };
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").classList.contains("necessary")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".package-number-items").querySelector(".code").value == '+98') {
                                    var regex = /^9([0123645789]{9})$/;
                                    if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").value)) {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("buyer-info-content")[i].querySelector(".mobile").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يبدأ الهاتف الخليوي بـ 9 أرقام ولا يتجاوز 10 أرقام.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };

                        }

                    };


                }

                if (isValid) {
                    // updated login 
                    document.querySelector(".check-has-data").querySelectorAll("input").forEach(e => {
                        if (e.dataset.verify) {
                            if (e.dataset.verify == 'false') {
                                if (document.querySelector(".verify-request-container").classList.contains("verify-request-container-toggle")) {
                                    document.querySelector(".verify-request-container").classList.toggle("verify-request-container-toggle");
                                }
                                isVerify = false;
                                if (e.classList.contains("email")) {

                                    document.querySelector(".email-verify-container").classList.remove("unvisible");
                                    document.querySelector(".email-verify-container").querySelector(".email-verify").value = e.value;

                                }
                                if (e.classList.contains("mobile")) {

                                    document.querySelector(".mobile-verify-container").classList.remove("unvisible");
                                    document.querySelector(".mobile-verify-container").querySelector(".mobile-verify").value = e.value;
                                    document.querySelector(".mobile-verify-container").querySelector(".code-verify-container").classList.add("unvisible");
                                    document.querySelector(".mobile-verify-container").querySelector(".btn-item").dataset.type = `verifyrequest`;
                                    document.querySelector(".mobile-verify-container").querySelector(".btn-item").innerHTML = `ارسال کد`;
                                }
                            } else {

                            }
                        }
                    });
                    if (isVerify) {


                        for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                            for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash").length; j++) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash")[j].value == '') {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash")[j].value = '-'
                                }
                            }
                        };
                        document.querySelector(".buyers-info-content").classList.add("unvisible");
                        if (document.querySelector(".services-info-content")) {
                            if (document.querySelector(".serviceid")) {
                                document.querySelector(".services-info-content").classList.remove("unvisible");
                                if (document.querySelector(".services-info-content").getAttribute("data-load") == 0) {
                                    var airport_id = document.getElementsByClassName("airport-id");
                                    var airport_name = document.getElementsByClassName("airport-name");
                                    var airport_id_len = (airport_id.length) - 1;
                                    for (var i = 0; i < airport_id.length; i++) {
                                        airport_id[airport_id_len].setAttribute("class", "main-airport-id")
                                        airport_name[airport_id_len].setAttribute("class", "main-airport-name")
                                    };
                                    var hotel_dmnid = 0;
                                    var serviceid = "";
                                    var cityid = "";
                                    var main_airport_id = "";
                                    var main_airport_name = "";
                                    var hotel_service_type = "";

                                    var flight_time_dep = "";
                                    var flight_time_des = "";
                                    var flight_mstring_dep = "";
                                    var flight_mstring_des = "";
                                    var flight_routCode_dep = "";
                                    var flight_routCode_des = "";
                                    var flight_airline_dep = "";
                                    var flight_airline_des = "";
                                    if (document.querySelector(".main-container").getAttribute("data-schemaid") == 251) {
                                        cityid = document.querySelector(".invoice-form").querySelector("input[name=cityid]").value
                                    } else {
                                        if (document.querySelector(".invoice-form").querySelector(".cityid")) {
                                            cityid = document.querySelector(".invoice-form").querySelector(".cityid").value;
                                        };
                                        hotel_service_type = 290251;
                                        flight_time_dep = document.querySelector(".flight-time-dep").value;
                                        flight_time_des = document.querySelector(".flight-time-des").value;
                                        flight_mstring_dep = document.querySelector(".flight-mstring-dep").value;
                                        flight_mstring_des = document.querySelector(".flight-mstring-des").value;
                                        flight_routCode_dep = document.querySelector(".flight-routCode-dep").value;
                                        flight_routCode_des = document.querySelector(".flight-routCode-des").value;
                                        flight_airline_dep = document.querySelector(".flight-airline-dep").value;
                                        flight_airline_des = document.querySelector(".flight-airline-des").value;
                                    };

                                    if (document.querySelector(".invoice-form").querySelector(".main-airport-id")) {
                                        main_airport_id = document.querySelector(".invoice-form").querySelector(".main-airport-id").value;
                                    };
                                    if (document.querySelector(".invoice-form").querySelector(".main-airport-name")) {
                                        main_airport_name = document.querySelector(".invoice-form").querySelector(".main-airport-name").value;
                                    };
                                    if (document.querySelector(".hotel_dmnid")) {
                                        hotel_dmnid = document.querySelector(".hotel_dmnid").value;
                                    } else {
                                        const obj = JSON.parse(document.querySelector(".mainprovider").value);
                                        hotel_dmnid = obj.dmnid;
                                    };

                                    serviceid = document.querySelector(".serviceid").value;

                                    $.post('/Client_Hotel_Services_Ar_ver.2.bc', {
                                        provider: document.querySelector(".provider").value,
                                        cityid: cityid,
                                        fdate: document.querySelector(".invoice-form").querySelector("input[name=fdate]").value,
                                        tdate: document.querySelector(".invoice-form").querySelector("input[name=tdate]").value,
                                        passenger: document.querySelector(".invoice-form").querySelector("input[name=roomSearch]").value,
                                        supplier: document.querySelector(".invoice-form").querySelector("input[name=supplier]").value,
                                        serviceid: serviceid,
                                        userid: document.querySelector(".main-userid").value,
                                        real_name: document.querySelector(".realname").innerText,
                                        flight_time_des: flight_time_des,
                                        flight_time_dep: flight_time_dep,
                                        flight_mstring_dep: flight_mstring_dep,
                                        flight_mstring_des: flight_mstring_des,
                                        flight_routCode_dep: flight_routCode_dep,
                                        flight_routCode_des: flight_routCode_des,
                                        flight_airline_dep: flight_airline_dep,
                                        flight_airline_des: flight_airline_des,
                                        airport: main_airport_id,
                                        airport_name: main_airport_name,
                                        hotel_service_type: hotel_service_type,
                                        hotel_dmnid: hotel_dmnid

                                    }, function (response) {
                                        $(".services-info-content").html(response);
                                        show_service_content(element);

                                    });
                                    document.querySelector(".services-info-content").setAttribute("data-load", 1);
                                } else {
                                    show_service_content(element);
                                }

                            } else if (document.querySelector(".hotel_extra_service")) {
                                //<!----------------START JS EXTRA SERVICE HOTEL---------------->
                                var check_provider = document.querySelector(".provider").value;

                                // added jami
                                const transferTypeElement = document.querySelector(".hotel_transfer_type");
                                
                                if (transferTypeElement && transferTypeElement.value === "1") {
                                    const transferTypeModule = document.querySelector(".hotel_transfer_moduletype");
                                    const hotelIdInput = document.querySelector(".hotelid_transfer_type");
                                    const providerIDHotel = document.querySelector('.invoice-form input[name="provider"]');
                                    const hotelRoomsInput = document.querySelector('.invoice-form input[name="rooms"]');
                                    const hotelid = hotelIdInput ? hotelIdInput.value : null;
                                    const hotelRoomsTransfer = hotelRoomsInput ? hotelRoomsInput.value : null;
                                    const providerIDHotelData = providerIDHotel ? providerIDHotel.value : null;
                                    const transferTypeModuleData = transferTypeModule ? transferTypeModule.value : null;
                                
                                    if (!hotelid) {
                                        console.warn("hotelid_transfer_type not found or has no value.");
                                    } else {
                                        document.querySelector(".services-info-content").classList.remove("unvisible");
                                
                                        fetch('/Client_Hotel_Transfer_form_AR.bc', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded',
                                            },
                                            body: `hotelid=${encodeURIComponent(hotelid)}&rooms=${encodeURIComponent(hotelRoomsTransfer)}&providerid=${encodeURIComponent(providerIDHotelData)}&transfermoduletype=${encodeURIComponent(transferTypeModuleData)}`
                                        })
                                        .then(response => response.text())
                                        .then(html => {
                                            const container = document.querySelector(".services-info-content");
                                
                                            if (container) {
                                                container.innerHTML = html;
                                                container.setAttribute("data-load", "1");
                                
                                                const tempDiv = document.createElement("div");
                                                tempDiv.innerHTML = html;
                                                const scripts = tempDiv.querySelectorAll("script");
                                
                                                scripts.forEach(script => {
                                                    const newScript = document.createElement("script");
                                
                                                    if (script.src) {
                                                        newScript.src = script.src;
                                                        newScript.async = false; 
                                                        document.body.appendChild(newScript);
                                                    } else {
                                                        newScript.textContent = script.textContent;
                                                        document.body.appendChild(newScript);
                                                    }
                                
                                                });
                                                show_extra_service_content(element);
                                            }
                                        })
                                        .catch(error => {
                                            console.error("Error loading transfer info:", error);
                                        });
                                    }
                                } else if (transferTypeElement && transferTypeElement.value === "2"){
                                    if (check_provider == 82 || check_provider == 114) {
                                        $(".view-service-price").empty()
                                        var finalprice = $(".firstpay-section").attr("data-price")
                                        $(".firstpay-price").each(function () {
                                            $(this).text(finalprice);
                                            $(this).text(new Intl.NumberFormat().format($(this).text()))
                                        })
                                        $(".firstpay-section").attr("data-output", finalprice);
                                        $(".price_firstpay").val(finalprice);
                                        document.querySelector(".services-info-content").classList.remove("unvisible");
                                        var hotel_extra_service = true;
                                        const FareSourceCode_obj = JSON.parse(document.querySelector(".hotel_extra_service").value)
                                        var FareSourceCode = FareSourceCode_obj.id.FareSourceCode.transfer_options
                                        $.post('/Client_Hotel_ExtraServices_Ar_ver.2.bc', {
                                            FareSourceCode: FareSourceCode,
                                            extra_service: hotel_extra_service,
                                            providerid: check_provider,
                                            hotel_name: document.querySelector(".realname").textContent
                                        }, function (response) {
                                            $(".services-info-content").html(response);
                                        });
                                        document.querySelector(".services-info-content").setAttribute("data-load", 1);
                                        show_extra_service_content(element);
                                    }
                                } 







                            } else {
                                if (document.querySelector(".main-container").getAttribute("data-schemaid") == 290251) {
                                    show_insurance_content(element);
                                } else {
                                    show_summary_content(element);
                                };
                            }


                        } else {
                            show_summary_content(element);
                        }
                    }





                }
            }
        } else if (element.getAttribute("data-step") == "summary") {
            if (document.querySelector(".rule-condition-content").querySelector(".description")) {
                document.querySelector(".rule-condition-content").querySelector(".description").remove();
            };
            if (document.querySelector(".counter-content").querySelector(".description")) {
                document.querySelector(".counter-content").querySelector(".description").remove();
            };
            var isValid = true;
            if (!document.querySelector(".rule-condition-content").querySelector("input[type=checkbox]").checked) {
                document.querySelector(".rule-condition-content").insertAdjacentHTML('beforeend',
                    `<div class="description">یرجی مطالعة قسم القوانين</div>`);
                isValid = false;
            } else {
                if (document.querySelector(".rule-condition-content").querySelector(".description")) {
                    document.querySelector(".rule-condition-content").querySelector(".description").remove();
                }
            };
            if (document.querySelector(".counter-content").classList.contains("is-necessary")) {
                if (document.querySelector(".counter-content").querySelector(".name").value == "") {
                    document.querySelector(".counter-content").insertAdjacentHTML('beforeend',
                        `<div class="description">الرجاء تحديد عداد المشغل</div>`);
                    isValid = false;
                } else {
                    if (document.querySelector(".counter-content").querySelector(".description")) {
                        document.querySelector(".counter-content").querySelector(".description").remove();
                    }
                }
            };
            if (isValid) {
                document.querySelector(".summary-invoice").classList.remove("unvisible");
                document.querySelector(".invoice-container").innerHTML = `<div id="ballsWaveG"> <div id="ballsWaveG_1" class="ballsWaveG"></div><div id="ballsWaveG_2" class="ballsWaveG"></div><div id="ballsWaveG_3" class="ballsWaveG"></div><div id="ballsWaveG_4" class="ballsWaveG"></div><div id="ballsWaveG_5" class="ballsWaveG"></div><div id="ballsWaveG_6" class="ballsWaveG"></div> <div id="ballsWaveG_7" class="ballsWaveG"></div><div id="ballsWaveG_8" class="ballsWaveG"></div> </div>`
                if (document.querySelector(".Credit_payment")) {
                    if (document.querySelector(".Credit_payment").value == 1) {
                        credit_payment();
                    };
                }
                if (document.querySelector("input[name=share]").value == 1) {
                    document.querySelector(".invoice-container").innerHTML = `<div class="invoice-content preInvoice" data-clicked="0" onclick="check_invoice(this,'preInvoice')">انقر لتسجيل العقد المسبق</div>`;
                    document.querySelector("input[name=bank_id]").value = -1;
                } else {
                    if (document.querySelector("input[name=accounttype]").value == 1) {
                        document.querySelector(".invoice-container").innerHTML = `<div class="invoice-content preInvoice" data-clicked="0" onclick="check_invoice(this,'preInvoice')">انقر لتسجيل العقد المسبق وإرساله إلى قسم المحاسبة</div>`;
                    } else {
                        $.post('/Client_Bank_List_Ar_ver.2.bc', {
                            firstpay: document.querySelector(".firstpay-price").innerText,
                        }, function (response) {
                            if (document.querySelector(".invoice-container").querySelector("#ballsWaveG")) {
                                document.querySelector(".invoice-container").querySelector("#ballsWaveG").remove();
                            };
                            $(".invoice-container").append(response);
                        });
                    }

                }

            }





        } else if (element.getAttribute("data-step") == "service") {
            var isExist = true;
            var isValid = true;
            if (document.querySelector(".hotel-service-content")) {
                for (var i = 0; i < document.querySelector(".hotel-service-content").getElementsByClassName("service-info-item").length; i++) {
                    if (document.querySelector(".hotel-service-content").getElementsByClassName("service-info-item")[i].querySelector(".passengers-list").checked) {
                        let isChecked = 0;
                        for (var j = 0; j < document.querySelector(".hotel-service-content").getElementsByClassName("service-info-item")[i].getElementsByClassName("li-item").length; j++) {
                            if (document.querySelector(".hotel-service-content").getElementsByClassName("service-info-item")[i].getElementsByClassName("li-item")[j].querySelector(".select-service").checked) {
                                isChecked += 1
                            }
                        };
                        if (isChecked == 0) {
                            document.querySelector(".hotel-service-content").getElementsByClassName("service-info-item")[i].querySelector(".inner-item").querySelector("input").closest(".inner-item").classList.add("invalid");
                            isExist = false;
                        } else {
                            document.querySelector(".hotel-service-content").getElementsByClassName("service-info-item")[i].querySelector(".inner-item").querySelector("input").closest(".inner-item").classList.remove("invalid");
                        }
                    }
                }
            };
            if (document.querySelector(".transfer-hotel-content")) {
                for (var i = 0; i < document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item").length; i++) {
                    if (document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".description")) {
                        document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".description").remove();
                    };
                    if (document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".necessary")) {
                        document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                        if (document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".necessary").value == "") {
                            document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                            document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].insertAdjacentHTML('beforeend', `<div class="description">أدخل تفاصيل النقل.</div>`);
                            isExist = false;
                        }
                    };
                    if (document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item")) {
                        for (var j = 0; j < document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item").length; j++) {
                            if (document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item")[j].querySelector(".necessary")) {
                                document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item")[j].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                            };
                            if (document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item")[j].querySelector(".necessary")) {
                                if (document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item")[j].querySelector(".necessary").value == "") {
                                    document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                    isExist = false;
                                } else {

                                    if (!document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item")[j].querySelector(".necessary").getAttribute("data-id") && document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item")[j].querySelector(".necessary").getAttribute("data-id") == "") {
                                        document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].getElementsByClassName("passenger-date-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                        isExist = false;
                                    }
                                }
                            }
                        }
                    };


                }
            };
            if (document.querySelector(".georgia-services")) {
                //bitaaa
                var serviceContent = document.querySelector(".serviceItems-content");
                if (serviceContent && !serviceContent.classList.contains("unvisible")) {
                    if (document.querySelectorAll(".necessary-item").length === 0) {
                        if (document.querySelector(".geo-parent-desc")) {
                            document.querySelector(".georgia-services").querySelector(".description").remove();
                        }
                        document.querySelector(".georgia-services").insertAdjacentHTML('beforeend', `<div class="geo-parent-desc description">أكمل طريق دخول أو مغادرة واحد على الأقل.</div>`);
                        isExist = false;
                    } else {
                        if (document.querySelector(".geo-parent-desc")) {
                            document.querySelector(".georgia-services").querySelector(".description").remove();
                        }
                    }
                }
                for (var i = 0; i < document.getElementsByClassName("service-info-col-inner").length; i++) {
                    if (document.getElementsByClassName("service-info-col-inner")[i].querySelector(".description")) {
                        document.getElementsByClassName("service-info-col-inner")[i].querySelector(".description").remove();
                    };
                    if (document.getElementsByClassName("service-info-col-inner")[i].querySelector(".necessary-item")) {
                        document.getElementsByClassName("service-info-col-inner")[i].querySelector(".necessary-item").closest(".service-info-col-inner").classList.remove("invalid");
                        if (document.getElementsByClassName("service-info-col-inner")[i].querySelector(".necessary-item").value == "") {
                            document.getElementsByClassName("service-info-col-inner")[i].querySelector(".necessary-item").closest(".service-info-col-inner").classList.add("invalid");
                            document.getElementsByClassName("service-info-col-inner")[i].insertAdjacentHTML('beforeend', `<div class="description">أدخل تفاصيل النقل.</div>`);
                            isExist = false;
                        }
                    };
                }
            };
            if (isExist) {
                if (document.querySelector(".transfer-hotel-content")) {
                    for (var i = 0; i < document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item").length; i++) {
                        if (document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".clockpicker")) {
                            if (document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".clockpicker").classList.contains("necessary")) {
                                var start_timeid = document.querySelector(".start_timeid").value;
                                var start_time = document.querySelector(".start_time").value;
                                var end_timeid = document.querySelector(".end_timeid").value;
                                var end_time = document.querySelector(".end_time").value;
                                var hour = document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".clockpicker").value;
                                hour = hour.split(":")
                                H = hour[0] * 3600;
                                H = parseFloat(H)
                                M = hour[1] * 60;
                                M = parseFloat(M)
                                if (hour[2] == undefined) {
                                    S = 0
                                } else {
                                    S = hour[2];
                                    S = parseFloat(S)
                                }
                                var END = H + M + S;
                                if (start_timeid > end_timeid) {
                                    if (!(END >= start_timeid || END == 0 || END <= end_timeid)) {
                                        document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".clockpicker").closest(".inner-item").classList.add("invalid");
                                        document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".clockpicker").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن تكون الساعة بين ${start_time} و ${end_time} </div>`);
                                        isValid = false;
                                    } else {
                                        document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".clockpicker").closest(".inner-item").classList.remove("invalid");
                                    }
                                } else {
                                    if (!(start_timeid <= END && END <= end_timeid)) {
                                        document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".clockpicker").closest(".inner-item").classList.add("invalid");
                                        document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".clockpicker").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن تكون الساعة بين ${start_time} و ${end_time} </div>`);
                                        isValid = false;
                                    } else {
                                        document.querySelector(".transfer-hotel-content").getElementsByClassName("package-info-item")[i].querySelector(".clockpicker").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            }
                        }
                    }
                };
                if (isValid) {
                    document.querySelector(".has_products").value = 0;
                    if (document.querySelector(".summary-info.service").classList.contains("unvisible")) {
                        document.querySelector(".summary-info.service").classList.add("unvisible");
                    };
                    document.querySelector(".services-info-content").classList.add("unvisible");
                    if (document.querySelector(".main-container").getAttribute("data-schemaid") == 290251) {
                        show_insurance_content(element);
                    } else {
                        show_summary_content(element);
                    };
                    if (document.querySelector(".hotel-service-content")) {
                        for (var i = 0; i < document.querySelector(".hotel-service-content").getElementsByClassName("service-info-item").length; i++) {
                            if (document.querySelector(".hotel-service-content").getElementsByClassName("service-info-item")[i].querySelector(".passengers-list").checked) {
                                document.querySelector(".has_products").value = 1;
                                var element = document.createElement("div");
                                element.className = "t-body";
                                element.innerHTML = document.querySelector(".hotel-service-content").getElementsByClassName("service-info-item")[i].querySelector(".servicename").innerText;
                                document.querySelector(".summary-service-items").appendChild(element);
                                document.querySelector(".summary-info.service").classList.remove("unvisible");
                            }
                        }
                    };
                    if (document.querySelector(".transfer-hotel-content")) {
                        for (var i = 0; i < document.querySelector(".transfer-hotel-content").getElementsByClassName("service-info-item").length; i++) {
                            if (document.querySelector(".transfer-hotel-content").getElementsByClassName("service-info-item")[i].querySelector(".transfer").checked) {
                                if (document.querySelector(".transfer-hotel-content").getElementsByClassName("service-info-item")[i].querySelector(".transfer").value != 0) {
                                    document.querySelector(".has_products").value = 1;
                                    var element = document.createElement("div");
                                    element.className = "t-body";
                                    element.innerHTML = document.querySelector(".transfer-hotel-content").getElementsByClassName("service-info-item")[i].closest(".service-info-items").querySelector(".servicename").innerText;
                                    document.querySelector(".summary-service-items").appendChild(element);
                                    document.querySelector(".summary-info.service").classList.remove("unvisible");
                                }
                            }

                        }
                    }

                }
            };

        } else if (element.getAttribute("data-step") == "insurance") {
            document.querySelector(".insurances-info-content").classList.add("unvisible");
            show_summary_content(element);
        }
    } else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 500) {
        if (element.getAttribute("data-step") == "passenger") {
            var isExist = true;
            var isValid = true;
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description").remove();
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary")) {
                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").value == "") {
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل تفاصيل الركاب</div>`);
                            isExist = false;
                        }
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")) {
                        for (var y = 0; y < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item").length; y++) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary")) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                            };
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary")) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").value == "") {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                    isExist = false;
                                } else {

                                    if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").getAttribute("data-id") && document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").getAttribute("data-id") == "") {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                        isExist = false;
                                    }
                                }
                            }
                        }
                    };
                };

            };
            for (var i = 0; i < document.querySelector(".cips-info-content").getElementsByClassName("inner_box").length; i++) {
                for (var j = 0; j < document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item").length; j++) {
                    if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                        document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].querySelector(".description").remove();
                    };
                    if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary-cip")) {
                        document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary-cip").closest(".inner-item").classList.remove("invalid");
                        if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary-cip").value == "") {
                            document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary-cip").closest(".inner-item").classList.add("invalid");
                            document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل تفاصيل CP.</div>`);
                            isExist = false;
                        }
                    };
                    if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")) {
                        for (var y = 0; y < document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item").length; y++) {
                            if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary-cip")) {
                                document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary-cip").closest(".inner-item").classList.remove("invalid");
                            };
                            if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary-cip")) {
                                if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary-cip").value == "") {
                                    document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary-cip").closest(".inner-item").classList.add("invalid");
                                    isExist = false;
                                } else {

                                    if (!document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary-cip").getAttribute("data-id") && document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary-cip").getAttribute("data-id") == "") {
                                        document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary-cip").closest(".inner-item").classList.add("invalid");
                                        isExist = false;
                                    }
                                }
                            }
                        }
                    };

                };

            };
            if (isExist) {
                var exit_dateMs = document.querySelector(".exitDateMs").value;
                var exit_dateMs_date = new Date(exit_dateMs);
                for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {

                    var passenger_type = document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-type").value;
                    var birthday = document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").value;
                    var birthday_date = new Date(birthday);
                    // ADDED FOR DATE VALIDATION
                    var birth_parts = birthday.split('-');
                    var check_year = parseInt(birth_parts[0], 10);
                    var check_month = parseInt(birth_parts[1], 10);
                    var check_day = parseInt(birth_parts[2], 10);
                    if (isNaN(check_year) || isNaN(check_month) || isNaN(check_day)) {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                        isValid = false;
                    } else if (check_month < 1 || check_month > 12) {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                        isValid = false;
                    } else if (check_day < 1 || check_day > new Date(check_year, check_month, 0).getDate()) {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                        isValid = false;
                    } else if (isNaN(birthday_date.getTime())) {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                        isValid = false;
                    } else {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelectorAll(".description").forEach((desc) => {
                            desc.remove();
                        })
                        var cms_date = document.getElementById("cms-date").value;
                        var a = "";
                        cms_date.split("/").forEach(function (x) {
                            x.length >= 2 ? a += x : a += ("0" + x);
                            a += "-";
                        })
                        a = a.substr(0, a.length - 1);
                        date = a.split("-");
                        date = date[2] + "-" + date[0] + "-" + date[1];
                        var current_date = new Date(date);
                        var time_diff = current_date.getTime() - birthday_date.getTime();
                        var days_diff = Math.ceil(time_diff / (1000 * 3600 * 24));
                        var tmp = (Math.floor(days_diff / 365));
                        if (passenger_type == 2) {
                            if (tmp < 12 || tmp > 98) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">للبالغين، أدخل تاريخ ميلاد صالحًا</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");
                            }
                        } else if (passenger_type == 1) {
                            if (tmp < 2 || tmp > 12) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخ ميلاد صالحًا للطفل</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");
                            }
                        } else if (passenger_type == 0) {
                            if (tmp < 0 || tmp > 2) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخ ميلاد صالحًا للرضیع</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    }


                    if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate")) {
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").classList.contains("necessary")) {
                            var passexpiredate = document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").value;
                            var passexpiredate_date = new Date(passexpiredate);
                            // ADDED FOR DATE VALIDATION
                            var expiredate_parts = passexpiredate.split('-');
                            var check_year = parseInt(expiredate_parts[0], 10);
                            var check_month = parseInt(expiredate_parts[1], 10);
                            var check_day = parseInt(expiredate_parts[2], 10);
                            if (isNaN(check_year) || isNaN(check_month) || isNaN(check_day)) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else if (check_month < 1 || check_month > 12) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else if (check_day < 1 || check_day > new Date(check_year, check_month, 0).getDate()) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else if (isNaN(passexpiredate_date.getTime())) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelectorAll(".description").forEach((desc) => {
                                    desc.remove();
                                })
                                var time_diff = passexpiredate_date.getTime() - exit_dateMs_date.getTime();
                                var days_diff = Math.ceil(time_diff / (1000 * 3600 * 24));
                                if (days_diff < 183) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يكون تاريخ انتهاء جواز السفر أكثر من 6 أشهر.</div>`);
                                    isValid = false;

                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");

                                }
                            }

                        };
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").classList.contains("necessary")) {
                        var passportcode = document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").value;
                        var regex = /^[a-zA-Z]{1}[0-9]{8}$/;
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".issuecountry")) {
                            if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".issuecountry").value == 1002236) {
                                if (!regex.test(passportcode)) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم جواز السفر غير صحيح.</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.remove("invalid");
                                }
                            }

                        } else {
                            if (!regex.test(passportcode)) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم جواز السفر غير صحيح.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.remove("invalid");
                            }
                        }

                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode")) {
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").classList.contains("necessary")) {
                            var NationalCode = document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").value;
                            var checkArray = 0;
                            for (j = 0; j < 10; j++) {
                                if (NationalCode[0] == NationalCode[j]) {
                                    checkArray++
                                }
                            }
                            if (checkArray < 10) {
                                var check = parseFloat(NationalCode[9]);
                                var sum = 0;
                                var index;
                                for (index = 0; index < 9; index++) {
                                    sum += parseFloat(NationalCode[index]) * (10 - index);
                                }
                                sum %= 11;
                                if ((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".inner-item").classList.remove("invalid");
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم الهویة الوطنية غير صحيح.</div>`);
                                    isValid = false;
                                }
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم الهویة الوطنية غير صحيح.</div>`);
                                isValid = false;
                            }

                        }
                    };
                    for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english").length; j++) {
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].value.length < 2) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 2.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.remove("invalid");
                            }
                            var regex = new RegExp("^[a-zA-Z ]+$");
                            if (!regex.test(document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].value)) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">تم إدخال حرف غير قانوني.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        }
                    };

                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[0]) {
                        for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY ").length; j++) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].classList.contains("necessary")) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].getAttribute("data-value") == '') {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">اختر البلد.</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".inner-item").classList.remove("invalid");
                                }
                            }
                        }
                    };

                }
                for (var i = 0; i < document.querySelector(".cips-info-content").getElementsByClassName("inner_box").length; i++) {
                    for (var j = 0; j < document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("address-cip").length; j++) {
                        if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("address-cip")[j].classList.contains("necessary-cip")) {
                            if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("address-cip")[j].value.length < 5) {
                                document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("address-cip")[j].closest(".inner-item").classList.add("invalid");
                                document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("address-cip")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 5.</div>`);
                                isValid = false;
                            } else {
                                document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("address-cip")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };

                    for (var j = 0; j < document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-number-items").length; j++) {
                        if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-cip")) {
                            if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-cip").classList.contains("necessary-cip")) {
                                if (document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-cip").closest(".package-number-items").querySelector(".code").value == '+98') {
                                    var regex = /^9([0123645789]{9})$/;
                                    if (!regex.test(document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-cip").value)) {
                                        document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-cip").closest(".inner-item").classList.add("invalid");
                                        document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].querySelector(".mobile-cip").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يبدأ الهاتف الخليوي بـ 9 أرقام ولا يتجاوز 10 أرقام.</div>`);
                                        isValid = false;
                                    } else {
                                        document.querySelector(".cips-info-content").getElementsByClassName("inner_box")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-cip").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };

                        }

                    };

                }
                if (isValid) {
                    if (document.querySelector(".main-userid").value == 0) {
                        // updated login 
                        showLoginContainer();
                    } else {
                        document.querySelector(".passengers-info-content").classList.add("unvisible");
                        document.querySelector(".cips-info-content").classList.add("unvisible");
                        document.querySelector(".buyers-info-content").classList.remove("unvisible");
                        document.querySelector(".step-title").innerText = 'بیانات المشتري';
                        element.setAttribute("data-step", "buyer");
                        element.previousElementSibling.classList.remove("unvisible");
                        element.previousElementSibling.setAttribute("data-step", "buyer");
                        check_steps("buyer");
                        // updated login 
                        if (document.querySelector(".buyers-info-content").getAttribute("data-load") == 0) {
                            $bc.setSource("db.runBuyer", {
                                userid: document.querySelector(".main-userid").value,
                                provider: document.querySelector(".provider").value,
                                run: true
                            })
                        }

                    }

                };
            }
        } else if (element.getAttribute("data-step") == "buyer") {
            var isExist = true;
            var isValid = true;
            // updated login 
            var isVerify = true;
            for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description").remove();
                    };
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary")) {
                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").value == "") {
                            document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل بیانات المشتري.</div>`);
                            isExist = false;
                        }
                    };
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")) {
                        for (var y = 0; y < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items").length; y++) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code")) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").closest(".inner-item").classList.remove("invalid");
                            };
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").value == "") {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").closest(".inner-item").classList.add("invalid");
                                    isExist = false;
                                }
                            }
                        }
                    };







                };


            };
            if (isExist) {

                for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].value.length < 2) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 2 - قم بالتحرير في لوحة المستخدم.</div>`);
                                isValid = false;

                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].classList.contains("necessary")) {
                            var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                            if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].value)) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">البرید الإلکتروني  غير صحيح.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].value.length < 5) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 5.</div>`);
                                isValid = false;

                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").classList.contains("necessary")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".package-number-items").querySelector(".code").value == '+98') {
                                    var regex = /^[1-9][0-9]{9,10}$/;
                                    if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value)) {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("buyer-info-content")[i].querySelector(".tel").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يبدأ الخط الأرضي برمز المدينة.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };
                        };
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").classList.contains("necessary")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".package-number-items").querySelector(".code").value == '+98') {
                                    var regex = /^9([0123645789]{9})$/;
                                    if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").value)) {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("buyer-info-content")[i].querySelector(".mobile").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يبدأ الهاتف الخليوي بـ 9 أرقام ولا يتجاوز 10 أرقام.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };

                        }

                    };


                }

                if (isValid) {
                    // updated login 
                    document.querySelector(".check-has-data").querySelectorAll("input").forEach(e => {
                        if (e.dataset.verify) {
                            if (e.dataset.verify == 'false') {
                                if (document.querySelector(".verify-request-container").classList.contains("verify-request-container-toggle")) {
                                    document.querySelector(".verify-request-container").classList.toggle("verify-request-container-toggle");
                                }
                                isVerify = false;
                                if (e.classList.contains("email")) {

                                    document.querySelector(".email-verify-container").classList.remove("unvisible");
                                    document.querySelector(".email-verify-container").querySelector(".email-verify").value = e.value;

                                }
                                if (e.classList.contains("mobile")) {

                                    document.querySelector(".mobile-verify-container").classList.remove("unvisible");
                                    document.querySelector(".mobile-verify-container").querySelector(".mobile-verify").value = e.value;
                                    document.querySelector(".mobile-verify-container").querySelector(".code-verify-container").classList.add("unvisible");
                                    document.querySelector(".mobile-verify-container").querySelector(".btn-item").dataset.type = `verifyrequest`;
                                    document.querySelector(".mobile-verify-container").querySelector(".btn-item").innerHTML = `ارسال کد`;
                                }
                            } else {

                            }
                        }
                    });
                    if (isVerify) {
                        for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                            for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash").length; j++) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash")[j].value == '') {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash")[j].value = '-'
                                }
                            }
                        };

                        document.querySelector(".buyers-info-content").classList.add("unvisible");
                        document.querySelector(".summary-info-content").classList.remove("unvisible");
                        document.querySelector(".step-title").innerText = 'الدفع والإصدار';
                        element.setAttribute("data-step", "summary");
                        element.previousElementSibling.setAttribute("data-step", "summary");
                        check_steps("summary");
                        document.querySelector(".summary-passenger-items").innerHTML = "";
                        document.querySelector(".summary-buyer-items").innerHTML = "";

                        for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                            for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items").length; j++) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel")) {
                                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value == "-") {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = "-";

                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value;

                                    }
                                }
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile")) {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").value;
                                }
                            }
                        };

                        // updated login
                        const properties = new Array()
                        document.querySelector(".check-has-data").querySelectorAll("input").forEach(e => {
                            if (e.dataset.changed) {
                                if (e.dataset.changed == 1) {
                                    if (e.dataset.id) {
                                        var obj = `{
 "${e.dataset.id ? "edited" : "added"}": [
 {
 ${e.dataset.id ? `"id":${e.dataset.id},` : ``}
 "parts": [
     {
         "part": 1,
         "values": [
             {
                 ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
                 "value": "${e.value}"
             }
         ]
     }
 ]
 }
 ],
 "multi": false,
 "propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
 }`


                                        properties.push(JSON.parse(obj));
                                    } else {
                                        if (e.dataset.prpid !== '3' && e.dataset.prpid !== '5') {
                                            var obj = `{
 "${e.dataset.id ? "edited" : "added"}": [
 {
 ${e.dataset.id ? `"id":${e.dataset.id},` : ``}
 "parts": [
     {
         "part": 1,
         "values": [
             {
                 ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
                 "value": "${e.value}"
             }
         ]
     }
 ]
 }
 ],
 "multi": false,
 "propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
 }`


                                            properties.push(JSON.parse(obj));
                                        }

                                    }




                                }
                            }


                        })
                        if (properties.length > 0) {
                            var objEditUser = `{
                 "data": {
                 "lid": 3,
                 "paramUrl": "/${document.querySelector(".check-has-data").dataset.hashid}/ar/schema_name",
                 "properties": ${JSON.stringify(properties)},
                 "schemaId": "${document.querySelector(".check-has-data").dataset.hashid}",
                 "schemaVersion": "1.0.0",
                 "usedForId": ${document.querySelector(".main-userid").value}
             }}`
                            $bc.setSource("db.editUser", {
                                objEditUser: objEditUser,
                                rkey: document.querySelector(".main-rkey").value,
                                run: true
                            })
                        };

                        for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                            if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile")) {
                                var mobile_info = "";
                                if (document.querySelector(".buyer-3")) {
                                    mobile_info = document.querySelector(".buyer-3").querySelector(".mobile-info").value;
                                } else if (document.querySelector(".buyer-2")) {
                                    mobile_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".mobile-info").value;
                                }
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code1").value = mobile_info.substr(0, 3);
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code2").value = mobile_info.substr(3, 3);
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code3").value = mobile_info.substr(6, 7);

                            }
                            if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email")) {
                                var email_info = "";
                                if (document.querySelector(".buyer-3")) {
                                    email_info = document.querySelector(".buyer-3").querySelector(".email").value;
                                } else if (document.querySelector(".buyer-2")) {
                                    email_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".email").value;
                                }
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email").querySelector("input").value = email_info;
                            }



                        };

                        for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                            var element = document.createElement("div");
                            element.className = "t-bodys";

                            for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item").length; j++) {

                                if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].classList.contains("unvisible")) {

                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]")) {
                                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('passportexpiration') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthdate') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthday') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('passportIssueDate') > -1) {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").value}</div>`;
                                            element.appendChild(element_child);
                                        } else {
                                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].classList.contains("section_extra_service")) {
                                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".extra_service_id_value_final")) {
                                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".extra_service_id_value_final").value !== '') {
                                                        var element_child = document.createElement("div");
                                                        element_child.className = "d-item";
                                                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".extra_service_text").innerText}</div>`;
                                                        element.appendChild(element_child);
                                                    }
                                                }

                                            } else {
                                                var element_child = document.createElement("div");
                                                element_child.className = "d-item";
                                                element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                                element.appendChild(element_child);
                                            }
                                        }
                                    } else {

                                        var element_child = document.createElement("div");
                                        element_child.className = "d-item";
                                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                        element.appendChild(element_child);


                                    }



                                }

                            };


                            document.querySelector(".summary-passenger-items").appendChild(element);
                        };


                        var element = document.createElement("div");
                        element.className = "t-bodys";

                        for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item").length; j++) {

                            if (!document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].classList.contains("unvisible")) {
                                if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]")) {
                                    if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name")) {
                                        if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('mobile') > -1 || document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('tel') > -1) {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray dir-ltr">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").value}</div>`;
                                            element.appendChild(element_child);
                                        } else {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                            element.appendChild(element_child);
                                        }
                                    }

                                } else if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText !== 'قم باختيار الوكالة المطلوبة') {
                                    var element_child = document.createElement("div");
                                    element_child.className = "d-item";
                                    element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                    element.appendChild(element_child);
                                }



                            }

                        }

                        document.querySelector(".summary-buyer-items").appendChild(element);
                        if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4824 || document.querySelector(".main-container").getAttribute("data-dmnid") == 2475) {
                            $.post('/Client_Check_Member_Point_Ar_ver.2.bc', {
                                userid: document.querySelector(".main-userid").value,
                                product_data: document.querySelector(".coupon_data").value,
                                provider_id: document.querySelector(".provider").value,
                                schemaid: document.querySelector(".main-container").getAttribute("data-schemaid")
                            }, function (response) {
                                if (document.querySelector(".member-point-container").querySelector("#ballsWaveG")) {
                                    document.querySelector(".member-point-container").querySelector("#ballsWaveG").remove();
                                };
                                $(".member-point-container").show().html(response);
                            });
                        };

                        if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 3812 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4204 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4787 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4705) {

                            $(".counter-content").show();
                            document.querySelector(".counter-content").classList.add('is-necessary')
                        }
                    }




                }
            }
        } else if (element.getAttribute("data-step") == "summary") {
            if (document.querySelector(".rule-condition-content").querySelector(".description")) {
                document.querySelector(".rule-condition-content").querySelector(".description").remove();
            };
            if (document.querySelector(".counter-content").querySelector(".description")) {
                document.querySelector(".counter-content").querySelector(".description").remove();
            };
            var isValid = true;
            if (!document.querySelector(".rule-condition-content").querySelector("input[type=checkbox]").checked) {
                document.querySelector(".rule-condition-content").insertAdjacentHTML('beforeend',
                    `<div class="description">یرجی مطالعة قسم القوانين</div>`);
                isValid = false;
            } else {
                if (document.querySelector(".rule-condition-content").querySelector(".description")) {
                    document.querySelector(".rule-condition-content").querySelector(".description").remove();
                }
            };
            if (document.querySelector(".counter-content").classList.contains("is-necessary")) {
                if (document.querySelector(".counter-content").querySelector(".name").value == "") {
                    document.querySelector(".counter-content").insertAdjacentHTML('beforeend',
                        `<div class="description">الرجاء تحديد عداد المشغل</div>`);
                    isValid = false;
                } else {
                    if (document.querySelector(".counter-content").querySelector(".description")) {
                        document.querySelector(".counter-content").querySelector(".description").remove();
                    }
                }
            };
            if (isValid) {
                document.querySelector(".summary-invoice").classList.remove("unvisible");
                document.querySelector(".invoice-container").innerHTML = `<div id="ballsWaveG"> <div id="ballsWaveG_1" class="ballsWaveG"></div><div id="ballsWaveG_2" class="ballsWaveG"></div><div id="ballsWaveG_3" class="ballsWaveG"></div><div id="ballsWaveG_4" class="ballsWaveG"></div><div id="ballsWaveG_5" class="ballsWaveG"></div><div id="ballsWaveG_6" class="ballsWaveG"></div> <div id="ballsWaveG_7" class="ballsWaveG"></div><div id="ballsWaveG_8" class="ballsWaveG"></div> </div>`
                if (document.querySelector(".Credit_payment")) {
                    if (document.querySelector(".Credit_payment").value == 1) {
                        credit_payment();
                    };
                }
                if (document.querySelector("input[name=share]").value == 1) {
                    document.querySelector(".invoice-container").innerHTML = `<div class="invoice-content preInvoice" data-clicked="0" onclick="check_invoice(this,'preInvoice')">انقر لتسجيل العقد المسبق</div>`;
                    document.querySelector("input[name=bank_id]").value = -1;
                } else {
                    if (document.querySelector("input[name=accounttype]").value == 1) {
                        document.querySelector(".invoice-container").innerHTML = `<div class="invoice-content preInvoice" data-clicked="0" onclick="check_invoice(this,'preInvoice')">انقر لتسجيل العقد المسبق وإرساله إلى قسم المحاسبة</div>`;
                    } else {
                        $.post('/Client_Bank_List_Ar_ver.2.bc', {
                            firstpay: document.querySelector(".firstpay-price").innerText,
                        }, function (response) {
                            if (document.querySelector(".invoice-container").querySelector("#ballsWaveG")) {
                                document.querySelector(".invoice-container").querySelector("#ballsWaveG").remove();
                            };
                            $(".invoice-container").append(response);
                        });
                    }

                }

            }





        }
    } else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 250) {
        if (element.getAttribute("data-step") == "passenger") {
            var isExist = true;
            var isValid = true;
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description").remove();
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary")) {
                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").value == "") {
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل تفاصيل الركاب</div>`);
                            isExist = false;
                        }
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")) {
                        for (var y = 0; y < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item").length; y++) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary")) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                            };
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary")) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").value == "") {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                    isExist = false;
                                } else {

                                    if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").getAttribute("data-id") && document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").getAttribute("data-id") == "") {
                                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("passenger-date-item")[y].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                                        isExist = false;
                                    }
                                }
                            }
                        }
                    };







                };


            };
            if (isExist) {
                var exit_dateMs = document.querySelector(".exitDateMs").value;
                var exit_dateMs_date = new Date(exit_dateMs);
                for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                    var passenger_type = document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-type").value;
                    var birthday = document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").value;
                    var birthday_date = new Date(birthday);
                    // ADDED FOR DATE VALIDATION
                    var birth_parts = birthday.split('-');
                    var check_year = parseInt(birth_parts[0], 10);
                    var check_month = parseInt(birth_parts[1], 10);
                    var check_day = parseInt(birth_parts[2], 10);
                    if (isNaN(check_year) || isNaN(check_month) || isNaN(check_day)) {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                        isValid = false;
                    } else if (check_month < 1 || check_month > 12) {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                        isValid = false;
                    } else if (check_day < 1 || check_day > new Date(check_year, check_month, 0).getDate()) {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                        isValid = false;
                    } else if (isNaN(birthday_date.getTime())) {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا.</div>`);
                        isValid = false;
                    } else {
                        document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelectorAll(".description").forEach((desc) => {
                            desc.remove();
                        })
                        var cms_date = document.getElementById("cms-date").value;
                        var a = "";
                        cms_date.split("/").forEach(function (x) {
                            x.length >= 2 ? a += x : a += ("0" + x);
                            a += "-";
                        })
                        a = a.substr(0, a.length - 1);
                        date = a.split("-");
                        date = date[2] + "-" + date[0] + "-" + date[1];
                        var current_date = new Date(date);
                        var time_diff = current_date.getTime() - birthday_date.getTime();
                        var days_diff = Math.ceil(time_diff / (1000 * 3600 * 24));
                        var tmp = (Math.floor(days_diff / 365));
                        if (passenger_type == 2) {
                            if (tmp < 12 || tmp > 98) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">للبالغين، أدخل تاريخ ميلاد صالحًا</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");
                            }
                        }
                    }

                    if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate")) {
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").classList.contains("necessary")) {
                            var passexpiredate = document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").value;
                            var passexpiredate_date = new Date(passexpiredate);
                            // ADDED FOR DATE VALIDATION
                            var expiredate_parts = passexpiredate.split('-');
                            var check_year = parseInt(expiredate_parts[0], 10);
                            var check_month = parseInt(expiredate_parts[1], 10);
                            var check_day = parseInt(expiredate_parts[2], 10);
                            if (isNaN(check_year) || isNaN(check_month) || isNaN(check_day)) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else if (check_month < 1 || check_month > 12) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else if (check_day < 1 || check_day > new Date(check_year, check_month, 0).getDate()) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else if (isNaN(passexpiredate_date.getTime())) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">أدخل تاريخًا صالحًا. </div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelectorAll(".description").forEach((desc) => {
                                    desc.remove();
                                })
                                var time_diff = passexpiredate_date.getTime() - exit_dateMs_date.getTime();
                                var days_diff = Math.ceil(time_diff / (1000 * 3600 * 24));
                                if (days_diff < 183) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يكون تاريخ انتهاء جواز السفر أكثر من 6 أشهر.</div>`);
                                    isValid = false;

                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".month").closest(".inner-item").classList.remove("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".day").closest(".inner-item").classList.remove("invalid");

                                }
                            }

                        };
                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").classList.contains("necessary")) {
                        var passportcode = document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").value;
                        var regex = /^[a-zA-Z]{1}[0-9]{8}$/;
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".issuecountry")) {
                            if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".issuecountry").value == 1002236) {
                                if (!regex.test(passportcode)) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم جواز السفر  غير صحيح.</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.remove("invalid");
                                }
                            }

                        } else {
                            if (!regex.test(passportcode)) {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم جواز السفر  غير صحيح.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passportcode").closest(".inner-item").classList.remove("invalid");
                            }
                        }

                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode")) {
                        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").classList.contains("necessary")) {
                            var NationalCode = document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").value;


                            var checkArray = 0;
                            for (j = 0; j < 10; j++) {
                                if (NationalCode[0] == NationalCode[j]) {
                                    checkArray++
                                }
                            }
                            if (checkArray < 10) {

                                var check = parseFloat(NationalCode[9]);
                                var sum = 0;
                                var index;
                                for (index = 0; index < 9; index++) {
                                    sum += parseFloat(NationalCode[index]) * (10 - index);
                                }
                                sum %= 11;
                                if ((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)) {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".inner-item").classList.remove("invalid");
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم الهویة الوطنية غير صحيح.</div>`);
                                    isValid = false;
                                }
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".NationalCode").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">رقم الهویة الوطنية غير صحيح.</div>`);
                                isValid = false;
                            }

                        }
                    };
                    for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english").length; j++) {
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].value.length < 2) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 2.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.remove("invalid");
                            }
                            var regex = new RegExp("^[a-zA-Z ]+$");
                            if (!regex.test(document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].value)) {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">تم إدخال حرف غير قانوني.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("english")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        }
                    };
                    for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("result-upload").length; j++) {
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("result-upload")[j].innerHTML == "") {
                            isValid = false;
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("result-upload")[j].closest('li').querySelector(".inner-content").style.borderColor = "#f42e36";
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("result-upload")[j].closest('li').querySelector(".fa-upload").style.borderColor = "#f42e36";
                        } else {
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("result-upload")[j].closest('li').querySelector(".inner-content").style.borderColor = "#2db742";
                            document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("result-upload")[j].closest('li').querySelector(".fa-upload").style.borderColor = "#2db742";
                        }

                    };
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[0]) {
                        for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY ").length; j++) {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].classList.contains("necessary")) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].getAttribute("data-value") == '') {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".inner-item").classList.add("invalid");
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">اختر البلد.</div>`);
                                    isValid = false;
                                } else {
                                    document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("autocompleteCOUNTRY")[j].closest(".inner-item").classList.remove("invalid");
                                }
                            }
                        }
                    };
                }
                if (isValid) {
                    if (document.querySelector(".main-userid").value == 0) {
                        // updated login 
                        showLoginContainer();
                    } else {
                        document.querySelector(".passengers-info-content").classList.add("unvisible");
                        document.querySelector(".buyers-info-content").classList.remove("unvisible");
                        document.querySelector(".step-title").innerText = 'بیانات المشتري';
                        element.setAttribute("data-step", "buyer");
                        element.previousElementSibling.classList.remove("unvisible");
                        element.previousElementSibling.setAttribute("data-step", "buyer");
                        check_steps("buyer");
                        // updated login 
                        if (document.querySelector(".buyers-info-content").getAttribute("data-load") == 0) {
                            $bc.setSource("db.runBuyer", {
                                userid: document.querySelector(".main-userid").value,
                                provider: document.querySelector(".provider").value,
                                run: true
                            })
                        }



                    }




                };

            }
        } else if (element.getAttribute("data-step") == "buyer") {
            var isExist = true;
            var isValid = true;
            // updated login 
            var isVerify = true;
            for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item").length; j++) {
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description")) {
                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".description").remove();
                    };
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary")) {
                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.remove("invalid");
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").value == "") {
                            document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector(".necessary").closest(".inner-item").classList.add("invalid");
                            document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].insertAdjacentHTML('beforeend', `<div class="description">أدخل بیانات المشتري.</div>`);
                            isExist = false;
                        }
                    };
                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")) {
                        for (var y = 0; y < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items").length; y++) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code")) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").closest(".inner-item").classList.remove("invalid");
                            };
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").value == "") {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-info-item")[j].getElementsByClassName("package-number-items")[y].querySelector(".code").closest(".inner-item").classList.add("invalid");
                                    isExist = false;
                                }
                            }
                        }
                    };







                };


            };
            if (isExist) {

                for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].value.length < 2) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 2 - قم بالتحرير في لوحة المستخدم.</div>`);
                                isValid = false;

                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("name")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].classList.contains("necessary")) {
                            var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                            if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].value)) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">البرید الإلکتروني  غير صحيح.</div>`);
                                isValid = false;
                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("email")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].classList.contains("necessary")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].value.length < 5) {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".inner-item").classList.add("invalid");
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">الحد الأدنى لعدد الأحرف هو 5.</div>`);
                                isValid = false;

                            } else {
                                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("address")[j].closest(".inner-item").classList.remove("invalid");
                            }
                        };
                    };
                    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items").length; j++) {
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").classList.contains("necessary")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".package-number-items").querySelector(".code").value == '+98') {
                                    var regex = /^[1-9][0-9]{9,10}$/;
                                    if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value)) {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("buyer-info-content")[i].querySelector(".tel").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يبدأ الخط الأرضي برمز المدينة.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };
                        };
                        if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile")) {
                            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").classList.contains("necessary")) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".package-number-items").querySelector(".code").value == '+98') {
                                    var regex = /^9([0123645789]{9})$/;
                                    if (!regex.test(document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").value)) {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".inner-item").classList.add("invalid");
                                        document.getElementsByClassName("buyer-info-content")[i].querySelector(".mobile").closest(".package-info-item").insertAdjacentHTML('beforeend', `<div class="description">يجب أن يبدأ الهاتف الخليوي بـ 9 أرقام ولا يتجاوز 10 أرقام.</div>`);
                                        isValid = false;
                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".inner-item").classList.remove("invalid");
                                    }
                                }
                            };

                        }

                    };


                }

                if (isValid) {
                    // updated login 
                    document.querySelector(".check-has-data").querySelectorAll("input").forEach(e => {
                        if (e.dataset.verify) {
                            if (e.dataset.verify == 'false') {
                                if (document.querySelector(".verify-request-container").classList.contains("verify-request-container-toggle")) {
                                    document.querySelector(".verify-request-container").classList.toggle("verify-request-container-toggle");
                                }
                                isVerify = false;
                                if (e.classList.contains("email")) {

                                    document.querySelector(".email-verify-container").classList.remove("unvisible");
                                    document.querySelector(".email-verify-container").querySelector(".email-verify").value = e.value;

                                }
                                if (e.classList.contains("mobile")) {

                                    document.querySelector(".mobile-verify-container").classList.remove("unvisible");
                                    document.querySelector(".mobile-verify-container").querySelector(".mobile-verify").value = e.value;
                                    document.querySelector(".mobile-verify-container").querySelector(".code-verify-container").classList.add("unvisible");
                                    document.querySelector(".mobile-verify-container").querySelector(".btn-item").dataset.type = `verifyrequest`;
                                    document.querySelector(".mobile-verify-container").querySelector(".btn-item").innerHTML = `ارسال کد`;
                                }
                            } else {

                            }
                        }
                    });
                    if (isVerify) {


                        for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                            for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash").length; j++) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash")[j].value == '') {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("has-dash")[j].value = '-'
                                }
                            }
                        };

                        document.querySelector(".buyers-info-content").classList.add("unvisible");
                        document.querySelector(".summary-info-content").classList.remove("unvisible");
                        document.querySelector(".step-title").innerText = 'الدفع والإصدار';
                        element.setAttribute("data-step", "summary");
                        element.previousElementSibling.setAttribute("data-step", "summary");
                        check_steps("summary");
                        document.querySelector(".summary-passenger-items").innerHTML = "";

                        for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
                            for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items").length; j++) {
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel")) {
                                    if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value == "-") {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = "-";

                                    } else {
                                        document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value;
                                    }
                                }
                                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile")) {
                                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").value;
                                }
                            }
                        };

                        // updated login
                        const properties = new Array()
                        document.querySelector(".check-has-data").querySelectorAll("input").forEach(e => {
                            if (e.dataset.changed) {
                                if (e.dataset.changed == 1) {
                                    if (e.dataset.id) {
                                        var obj = `{
"${e.dataset.id ? "edited" : "added"}": [
{
${e.dataset.id ? `"id":${e.dataset.id},` : ``}
"parts": [
  {
      "part": 1,
      "values": [
          {
              ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
              "value": "${e.value}"
          }
      ]
  }
]
}
],
"multi": false,
"propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
}`


                                        properties.push(JSON.parse(obj));
                                    } else {
                                        if (e.dataset.prpid !== '3' && e.dataset.prpid !== '5') {
                                            var obj = `{
"${e.dataset.id ? "edited" : "added"}": [
{
${e.dataset.id ? `"id":${e.dataset.id},` : ``}
"parts": [
  {
      "part": 1,
      "values": [
          {
              ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
              "value": "${e.value}"
          }
      ]
  }
]
}
],
"multi": false,
"propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
}`


                                            properties.push(JSON.parse(obj));
                                        }

                                    }




                                }
                            }


                        })
                        if (properties.length > 0) {
                            var objEditUser = `{
              "data": {
              "lid": 3,
              "paramUrl": "/${document.querySelector(".check-has-data").dataset.hashid}/ar/schema_name",
              "properties": ${JSON.stringify(properties)},
              "schemaId": "${document.querySelector(".check-has-data").dataset.hashid}",
              "schemaVersion": "1.0.0",
              "usedForId": ${document.querySelector(".main-userid").value}
          }}`
                            $bc.setSource("db.editUser", {
                                objEditUser: objEditUser,
                                rkey: document.querySelector(".main-rkey").value,
                                run: true
                            })
                        };

                        for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                            if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile")) {
                                var mobile_info = "";
                                if (document.querySelector(".buyer-3")) {
                                    mobile_info = document.querySelector(".buyer-3").querySelector(".mobile-info").value;
                                } else if (document.querySelector(".buyer-2")) {
                                    mobile_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".mobile-info").value;
                                }
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code1").value = mobile_info.substr(0, 3);
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code2").value = mobile_info.substr(3, 3);
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code3").value = mobile_info.substr(6, 7);

                            }
                            if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email")) {
                                var email_info = "";
                                if (document.querySelector(".buyer-3")) {
                                    email_info = document.querySelector(".buyer-3").querySelector(".email").value;
                                } else if (document.querySelector(".buyer-2")) {
                                    email_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".email").value;
                                }
                                document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email").querySelector("input").value = email_info;
                            }



                        };

                        for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                            var element = document.createElement("div");
                            element.className = "t-bodys";

                            for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item").length; j++) {

                                if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].classList.contains("unvisible")) {

                                    if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].classList.contains("box-doc-infoes")) {

                                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]")) {

                                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('passportexpiration') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthdate') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthday') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('passportIssueDate') > -1) {
                                                var element_child = document.createElement("div");
                                                element_child.className = "d-item";
                                                element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").value}</div>`;
                                                element.appendChild(element_child);
                                            } else {
                                                var element_child = document.createElement("div");
                                                element_child.className = "d-item";
                                                element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                                element.appendChild(element_child);
                                            }
                                        } else {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                            element.appendChild(element_child);
                                        }



                                    }
                                }

                            };


                            document.querySelector(".summary-passenger-items").appendChild(element);
                        };


                        var element = document.createElement("div");
                        element.className = "t-bodys";

                        for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item").length; j++) {

                            if (!document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].classList.contains("unvisible")) {
                                if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]")) {
                                    if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name")) {
                                        if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('mobile') > -1 || document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('tel') > -1) {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray dir-ltr">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").value}</div>`;
                                            element.appendChild(element_child);
                                        } else {
                                            var element_child = document.createElement("div");
                                            element_child.className = "d-item";
                                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                            element.appendChild(element_child);
                                        }
                                    }

                                } else if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText !== 'قم باختيار الوكالة المطلوبة') {
                                    var element_child = document.createElement("div");
                                    element_child.className = "d-item";
                                    element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                                    element.appendChild(element_child);
                                }



                            }

                        }

                        document.querySelector(".summary-buyer-items").appendChild(element);
                        if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4824 || document.querySelector(".main-container").getAttribute("data-dmnid") == 2475) {
                            $.post('/Client_Check_Member_Point_Ar_ver.2.bc', {
                                userid: document.querySelector(".main-userid").value,
                                product_data: document.querySelector(".coupon_data").value,
                                provider_id: document.querySelector(".provider").value,
                                schemaid: document.querySelector(".main-container").getAttribute("data-schemaid")
                            }, function (response) {
                                if (document.querySelector(".member-point-container").querySelector("#ballsWaveG")) {
                                    document.querySelector(".member-point-container").querySelector("#ballsWaveG").remove();
                                };
                                $(".member-point-container").show().html(response);
                            });
                        };

                        if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 3812 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4204 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4787 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4705) {

                            $(".counter-content").show();
                            document.querySelector(".counter-content").classList.add('is-necessary')
                        }

                    }



                }
            }
        } else if (element.getAttribute("data-step") == "summary") {
            if (document.querySelector(".rule-condition-content").querySelector(".description")) {
                document.querySelector(".rule-condition-content").querySelector(".description").remove();
            };
            if (document.querySelector(".counter-content").querySelector(".description")) {
                document.querySelector(".counter-content").querySelector(".description").remove();
            };
            var isValid = true;
            if (!document.querySelector(".rule-condition-content").querySelector("input[type=checkbox]").checked) {
                document.querySelector(".rule-condition-content").insertAdjacentHTML('beforeend',
                    `<div class="description">یرجی مطالعة قسم القوانين</div>`);
                isValid = false;
            } else {
                if (document.querySelector(".rule-condition-content").querySelector(".description")) {
                    document.querySelector(".rule-condition-content").querySelector(".description").remove();
                }
            };
            if (document.querySelector(".counter-content").classList.contains("is-necessary")) {
                if (document.querySelector(".counter-content").querySelector(".name").value == "") {
                    document.querySelector(".counter-content").insertAdjacentHTML('beforeend',
                        `<div class="description">الرجاء تحديد عداد المشغل</div>`);
                    isValid = false;
                } else {
                    if (document.querySelector(".counter-content").querySelector(".description")) {
                        document.querySelector(".counter-content").querySelector(".description").remove();
                    }
                }
            };
            if (isValid) {
                document.querySelector(".summary-invoice").classList.remove("unvisible");
                if (document.querySelector(".Credit_payment")) {
                    if (document.querySelector(".Credit_payment").value == 1) {
                        credit_payment();
                    };
                }
                if (document.querySelector("input[name=share]").value == 1) {
                    document.querySelector(".invoice-container").innerHTML = `<div class="invoice-content preInvoice" data-clicked="0" onclick="check_invoice(this,'preInvoice')">انقر لتسجيل العقد المسبق</div>`;
                    document.querySelector("input[name=bank_id]").value = -1;
                } else {
                    if (document.querySelector("input[name=accounttype]").value == 1) {
                        document.querySelector(".invoice-container").innerHTML = `<div class="invoice-content preInvoice" data-clicked="0" onclick="check_invoice(this,'preInvoice')">انقر لتسجيل العقد المسبق وإرساله إلى قسم المحاسبة</div>`;
                    } else {
                        $.post('/Client_Bank_List_Ar_ver.2.bc', {
                            firstpay: document.querySelector(".firstpay-price").innerText,
                        }, function (response) {
                            if (document.querySelector(".invoice-container").querySelector("#ballsWaveG")) {
                                document.querySelector(".invoice-container").querySelector("#ballsWaveG").remove();
                            };
                            $(".invoice-container").append(response);
                        });
                    }

                }

            }





        }
    }

};
//<!----------------END JS NEXT STEP FLIGHT---------------->
//<!----------------START JS PREV STEP FLIGHT---------------->
function prev_step(element) {
    if (element.getAttribute("data-step") == "buyer") {
        if (document.querySelector(".cips-info-content")) {
            document.querySelector(".cips-info-content").classList.remove("unvisible");
        };
        if (document.querySelector(".passengers-notices-content")) {
            document.querySelector(".passengers-notices-content").classList.remove("unvisible");
        };
        if (document.querySelector(".passengers-extraServices-content")) {
            if (document.querySelector(".passengers-extraServices-content").getElementsByClassName("extraService-info-item")[0]) {
                document.querySelector(".passengers-extraServices-content").classList.remove("unvisible")
            }
        };
        document.querySelector(".passengers-info-content").classList.remove("unvisible");
        document.querySelector(".buyers-info-content").classList.add("unvisible");
        document.querySelector(".step-title").innerText = 'بيانات المسافرين';
        element.setAttribute("data-step", "");
        element.classList.add("unvisible");
        element.nextElementSibling.setAttribute("data-step", "passenger");
        check_steps("passenger");
    } else if (element.getAttribute("data-step") == "touristpanel") {
        document.querySelector(".buyers-info-content").classList.remove("unvisible");
        document.querySelector(".touristpanel-info-content").classList.add("unvisible");
        document.querySelector(".step-title").innerText = 'بیانات المشتري';
        element.setAttribute("data-step", "buyer");
        element.nextElementSibling.setAttribute("data-step", "buyer");
        check_steps("buyer");
    } else if (element.getAttribute("data-step") == "summary") {
        // bitaa
        if (document.querySelector('.coupon-form').querySelector('.response-code') && document.querySelector('.coupon-form').querySelector('.response-code').classList.contains('true')) {
            document.querySelector(".coupon-code").value = "";
            document.querySelector(".coupon-form").querySelector("button").click();
            currency_rate()
        }
        if (!document.querySelector(".summary-invoice").classList.contains("unvisible")) {
            document.querySelector(".summary-invoice").classList.add("unvisible");
        };

        if (document.querySelector(".rule-condition-content").querySelector(".description")) {
            document.querySelector(".rule-condition-content").querySelector(".description").remove();
        };
        if (document.querySelector(".counter-content").querySelector(".description")) {
            document.querySelector(".counter-content").querySelector(".description").remove();
        };
        if (document.querySelector(".main-container").getAttribute("data-schemaid") == 290251) {
            document.querySelector(".insurances-info-content").classList.remove("unvisible");
            document.querySelector(".summary-info-content").classList.add("unvisible");
            document.querySelector(".step-title").innerText = 'التأمين';
            element.setAttribute("data-step", "insurance");
            element.nextElementSibling.setAttribute("data-step", "insurance");
            check_steps("insurance");
        } else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 501) {
            if (document.querySelector(".transfer-info-content")) {
                document.querySelector(".touristpanel-info-content").classList.remove("unvisible");
                document.querySelector(".summary-info-content").classList.add("unvisible");
                document.querySelector(".step-title").innerText = 'الخدمة والخدمات';
                element.setAttribute("data-step", "touristpanel");
                element.nextElementSibling.setAttribute("data-step", "touristpanel");
                check_steps("touristpanel");
            } else {
                document.querySelector(".buyers-info-content").classList.remove("unvisible");
                document.querySelector(".summary-info-content").classList.add("unvisible");
                document.querySelector(".step-title").innerText = 'بیانات المشتري';
                element.setAttribute("data-step", "buyer");
                element.nextElementSibling.setAttribute("data-step", "buyer");
                check_steps("buyer");
            }


        } else if (document.querySelector(".main-container").getAttribute("data-schemaid") == 251 && (document.querySelector(".provider").value == 82 || document.querySelector(".provider").value == 114 || document.querySelector(".provider").value == 70)) {
            document.querySelector(".services-info-content").classList.remove("unvisible");
            document.querySelector(".summary-info-content").classList.add("unvisible");
            document.querySelector(".step-title").innerText = 'الخدمة والدورية';
            element.setAttribute("data-step", "service");
            element.nextElementSibling.setAttribute("data-step", "service");
            check_steps("service");
        } else {
            if (document.getElementsByClassName("service-info-content")[0]) {
                document.querySelector(".services-info-content").classList.remove("unvisible");
                document.querySelector(".summary-info-content").classList.add("unvisible");
                document.querySelector(".step-title").innerText = 'الخدمة والدورية';
                element.setAttribute("data-step", "service");
                element.nextElementSibling.setAttribute("data-step", "service");
                check_steps("service");
            } else {
                document.querySelector(".buyers-info-content").classList.remove("unvisible");
                document.querySelector(".summary-info-content").classList.add("unvisible");
                document.querySelector(".step-title").innerText = 'بیانات المشتري';
                element.setAttribute("data-step", "buyer");
                element.nextElementSibling.setAttribute("data-step", "buyer");
                check_steps("buyer");
            }
        }

    } else if (element.getAttribute("data-step") == "service") {
        document.querySelector(".buyers-info-content").classList.remove("unvisible");
        document.querySelector(".services-info-content").classList.add("unvisible");
        document.querySelector(".step-title").innerText = 'بیانات المشتري';
        element.setAttribute("data-step", "buyer");
        element.nextElementSibling.setAttribute("data-step", "buyer");
        check_steps("buyer");
    } else if (element.getAttribute("data-step") == "insurance") {
        if (document.getElementsByClassName("service-info-content")[0] || (document.querySelector(".main-container").getAttribute("data-schemaid") == 290251 && (document.querySelector(".provider").value == 82 || document.querySelector(".provider").value == 114 || document.querySelector(".provider").value == 70))) {
            document.querySelector(".services-info-content").classList.remove("unvisible");
            document.querySelector(".insurances-info-content").classList.add("unvisible");
            document.querySelector(".step-title").innerText = 'الخدمة والدورية';
            element.setAttribute("data-step", "service");
            element.nextElementSibling.setAttribute("data-step", "service");
            check_steps("service");
        } else {
            document.querySelector(".buyers-info-content").classList.remove("unvisible");
            document.querySelector(".insurances-info-content").classList.add("unvisible");
            document.querySelector(".step-title").innerText = 'بیانات المشتري';
            element.setAttribute("data-step", "buyer");
            element.nextElementSibling.setAttribute("data-step", "buyer");
            check_steps("buyer");
        }

    }
};
//<!----------------END JS PREV STEP FLIGHT---------------->
//<!----------------START JS PREV PASSENGERS---------------->
function show_passengersList(element) {
    if (document.querySelector(".main-userid").value == 0) {
        for (var i = 0; i < document.querySelector(".login-section-container").getElementsByTagName("form").length; i++) {
            document.querySelector(".login-section-container").getElementsByTagName("form")[i].querySelector(".passengerList-key").value = 1;
            document.querySelector(".login-section-container").getElementsByTagName("form")[i].querySelector(".dmnid-key").value = document.querySelector(".main-container").getAttribute("data-dmnid");
            document.querySelector(".login-section-container").getElementsByTagName("form")[i].querySelector(".internal-key").value = document.querySelector(".internal").value;
            document.querySelector(".login-section-container").getElementsByTagName("form")[i].querySelector(".index-key").value = element.closest(".passenger-info-content").getAttribute("data-index");
            if (element.closest(".passenger")) {
                document.querySelector(".login-section-container").getElementsByTagName("form")[i].querySelector(".index-room-key").value = element.closest(".passenger-info-content").getAttribute("data-index");
            }

        }
        // updated login 
        showLoginContainer();
    } else {
        if (element.getAttribute("data-open") == 0) {
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[0]) {
                    for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger").length; j++) {
                        document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].querySelector(".prev-passengers").setAttribute("data-open", 1);
                    };
                } else {
                    document.getElementsByClassName("passenger-info-content")[i].querySelector(".prev-passengers").setAttribute("data-open", 1);
                }
            };
            if (element.closest(".passenger")) {
                load_passengersList(document.querySelector(".main-container").getAttribute("data-dmnid"), document.querySelector(".main-userid").value, document.querySelector(".internal").value, element.closest(".passenger").getAttribute("data-index"), element.closest(".passenger-info-content").getAttribute("data-index"))

            } else {
                load_passengersList(document.querySelector(".main-container").getAttribute("data-dmnid"), document.querySelector(".main-userid").value, document.querySelector(".internal").value, element.closest(".passenger-info-content").getAttribute("data-index"))

            }
        } else {
            for (var i = 0; i < document.querySelector(".passengers-prev-container").getElementsByClassName("t-body").length; i++) {
                if (element.closest(".passenger")) {
                    document.querySelector(".passengers-prev-container").getElementsByClassName("t-body")[i].querySelector(".select-passnger").setAttribute("data-index-room", element.closest(".passenger-info-content").getAttribute("data-index"));
                    document.querySelector(".passengers-prev-container").getElementsByClassName("t-body")[i].querySelector(".select-passnger").setAttribute("data-index", element.closest(".passenger").getAttribute("data-index"));
                } else {
                    document.querySelector(".passengers-prev-container").getElementsByClassName("t-body")[i].querySelector(".select-passnger").setAttribute("data-index", element.closest(".passenger-info-content").getAttribute("data-index"));

                }
            };
            document.querySelector(".passengers-prev-container").classList.toggle("passengers-prev-container-toggle");
        }
    }

};
//<!----------------END JS PREV PASSENGERS---------------->
//<!----------------START JS CHECK COUPON---------------->
function check_coupon_form(event, element) {
    event.preventDefault();
    if(document.querySelector(".member-point-content .btn-item")){
        document.querySelectorAll(".member-point-content .btn-item").forEach(function (btn) {
            btn.disabled = true; 
            btn.classList.add("disabled");
        });
        if(document.querySelector(".disable-club-alert")){
            document.querySelectorAll(".disable-club-alert").forEach(function (text) {
                text.remove();
            });
        }
        document.querySelector(".member-point-content").insertAdjacentHTML('afterend', '<div class="action-message disable-club-alert"><span class="false">هذا القسم غير نشط بسبب استخدام قسيمة الخصم.</span></div>');
    }
    document.querySelector(".summary-invoice").classList.add("unvisible");
    document.querySelector(".invoice-container").innerHTML = `<div id="ballsWaveG"> <div id="ballsWaveG_1" class="ballsWaveG"></div><div id="ballsWaveG_2" class="ballsWaveG"></div><div id="ballsWaveG_3" class="ballsWaveG"></div><div id="ballsWaveG_4" class="ballsWaveG"></div><div id="ballsWaveG_5" class="ballsWaveG"></div><div id="ballsWaveG_6" class="ballsWaveG"></div> <div id="ballsWaveG_7" class="ballsWaveG"></div><div id="ballsWaveG_8" class="ballsWaveG"></div> </div>`
    $(element).closest("form").find(".action-loading").show();
    var self = $(element);
    var totalcom = 0;
    if (document.querySelector(".totalcom-section").querySelector(".totalcom-price")) {
        totalcom = document.querySelector(".totalcom-section").querySelector(".totalcom-price").innerText.replace(/\,/g, '');
    } else {
        totalcom = document.querySelector(".firstpay-section").getAttribute("data-output");
    }
    $.post('/Client_Check_Coupon_Ar_ver.2.bc', {
        schemaid: document.querySelector(".main-container").getAttribute("data-schemaid"),
        provider: document.querySelector(".provider").value,
        accounttype: document.querySelector("input[name=accounttype]").value,
        coupondata: document.querySelector(".coupon_data").value,
        code: document.querySelector(".coupon-code").value,
        userid: document.querySelector(".main-userid").value,
        firstpay: document.querySelector(".firstpay-section").getAttribute("data-output"),
        totalcom: totalcom,
    }, function (response) {
        self.closest("form").find(".action-loading").hide();
        self.closest("form").find(".action-message").empty().show().html(response);
        currency_rate()
    });
};

//<!----------------END JS CHECK COUPON---------------->
//<!----------------START JS CREDIT PAYMENT---------------->
function credit_payment() {
    function convertPersianNumberToEnglish(num) {
        const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
        const englishDigits = '0123456789';
        let englishNumber = '';

        for (let i = 0; i < num.length; i++) {
            const persianIndex = persianDigits.indexOf(num[i]);
            englishNumber += persianIndex === -1 ? num[i] : englishDigits[persianIndex];
        }

        return englishNumber;
    }

    function shouldConvertBasedOnLanguage() {
        const userLang = navigator.language || navigator.languages[0];
        return !userLang.toLowerCase().startsWith('en');
    }

    let totalcom = 0;

    const totalcomElem = document.querySelector(".totalcom-section .totalcom-price");
    const firstpayElem = document.querySelector(".firstpay-section .firstpay-price");

    if (totalcomElem) {
        totalcom = totalcomElem.innerText.replace(/\,/g, '');
    } else if (firstpayElem) {
        totalcom = firstpayElem.innerText.replace(/\,/g, '');
    }

    if (shouldConvertBasedOnLanguage()) {
        totalcom = convertPersianNumberToEnglish(totalcom);
    }

    $.post('/Client_Credit_Payment_Ar_ver.2.bc', {
        totalcom: totalcom,
        moneytype: document.querySelector(".moneytype-value").getAttribute("data-output"),
        userid: document.querySelector(".main-userid").value,
    }, function (response) {
        const loader = document.querySelector(".invoice-container #ballsWaveG");
        if (loader) loader.remove();
        $(".invoice-container").append(response);
    });
};
//<!----------------END JS CREDIT PAYMENT---------------->
//<!----------------START JS COUNTER LIST---------------->
function toggle_counter_list(element) {
    element.closest(".package-info-item").querySelector(".drop-item").classList.toggle(
        "drop-item-toggle");
    if (element.getAttribute("data-load") == 0) {
        element.closest(".package-info-item").querySelector(".fa-spinner").classList.remove(
            "unvisible");
        $.get('/Client_Counter_List.bc?type=1', function (response) {
            element.closest(".package-info-item").querySelector(".drop-item").innerHTML =
                response;
            element.setAttribute("data-load", 1);
            element.closest(".package-info-item").querySelector(".fa-spinner").classList.add(
                "unvisible");
        });
    }

};

function select_counter(element) {
    element.closest(".package-info-item").querySelector(".name").value = element.querySelector(".first-name").innerText + ' ' + element.querySelector(".last-name").innerText;
    element.closest(".package-info-item").querySelector(".drop-item").classList.remove("drop-item-toggle");
    document.querySelector("input[name=agencycountername]").value = element.querySelector(".first-name").innerText + ' ' + element.querySelector(".last-name").innerText;
    document.querySelector("input[name=agencycounter]").value = element.getAttribute("data-id");
};

//<!----------------END JS COUNTER LIST---------------->
//<!----------------START JS INVOICE NOTE---------------->
function invoice_desc(event, element) {
    document.querySelector("input[name=invoicedesc]").value = element.value;
};
//<!----------------END JS INVOICE NOTE---------------->
//<!----------------START JS INVOICE RULES---------------->
function show_condition(element) {
    element.closest(".rule-condition-content").querySelector(".invoice-condition-container").classList.add("invoice-condition-container-toggle");
    if (element.closest(".rule-condition-content").querySelector("input[type=checkbox]").getAttribute("data-check") == 0) {
        $.get('/Client_Company_Rules_Ar.bc', function (response) {
            element.closest(".rule-condition-content").querySelector(".invoice-condition-container").innerHTML = response;
            element.closest(".rule-condition-content").querySelector("input[type=checkbox]").setAttribute("data-check", 1);
        });

    }

};

function close_condition(element) {
    element.closest(".rule-condition-content").querySelector(".invoice-condition-container").classList.remove("invoice-condition-container-toggle");
};
//<!----------------END JS INVOICE RULES---------------->
//<!----------------START JS RULE ROOM HOTEL---------------->
function show_rule_room(element, type) {
    element.closest(".section-item").querySelector(".room-loading").classList.remove("unvisible");
    let url = "";
    if (type) {
        url = "/Client_FlightHotel_Room_Rule.bc"
    } else {
        url = "/Client_Rule_Room.bc"
    }
    let mainprovider = 0;
    if (document.querySelector(".mainprovider").value !== '""') {
        mainprovider = document.querySelector(".mainprovider").value;
    }
    $.post(`${url}`, {
        mainprovider: mainprovider,
        optionId: document.querySelector(".optionId").value
    }, function (response) {
        element.closest(".section-item").querySelector(".room-loading").classList.add("unvisible");
        element.closest(".section-item").querySelector(".response").innerHTML = response;
    });
};
//<!----------------END JS RULE ROOM HOTEL---------------->
//<!----------------START JS SERVICE HOTEL---------------->
function show_service_content(element) {
    if (document.getElementsByClassName("service-info-content")[0]) {
        if (document.querySelector(".transfer-hotel-content")) {
            for (var i = 0; i < document.querySelector(".transfer-hotel-content").querySelector(".departure").querySelector(".datepicker").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_year_service.push({
                    "data_value": `${document.querySelector(".transfer-hotel-content").querySelector(".departure").querySelector(".datepicker").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.querySelector(".transfer-hotel-content").querySelector(".departure").querySelector(".datepicker").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,

                })
            }
        }

        document.querySelector(".step-title").innerText = 'الخدمة والدورية';
        element.setAttribute("data-step", "service");
        element.previousElementSibling.setAttribute("data-step", "service");
        check_steps("service");
    } else {
        document.querySelector(".services-info-content").classList.add("unvisible");
        if (document.querySelector(".main-container").getAttribute("data-schemaid") == 290251) {
            show_insurance_content(element);
        } else {
            show_summary_content(element);
        }
    }
};
//<!----------------END JS SERVICE HOTEL---------------->
//<!----------------START JS EXTRA SERVICE HOTEL---------------->
function show_extra_service_content(element) {
    document.querySelector(".step-title").innerText = 'الخدمة والنقل';
    element.setAttribute("data-step", "service");
    element.previousElementSibling.setAttribute("data-step", "service");
    check_steps("service");
};
//<!----------------END JS EXTRA SERVICE HOTEL---------------->
//<!----------------START JS SUMMARY HOTEL---------------->
function show_summary_content(element) {
    document.querySelector(".summary-info-content").classList.remove("unvisible");
    document.querySelector(".step-title").innerText = 'الدفع والإصدار';
    element.setAttribute("data-step", "summary");
    element.previousElementSibling.setAttribute("data-step", "summary");
    check_steps("summary");
    document.querySelector(".summary-passenger-items").innerHTML = "";
    document.querySelector(".summary-buyer-items").innerHTML = "";
    document.querySelector(".summary-service-items").innerHTML = "";

    for (var i = 0; i < document.getElementsByClassName("buyer-info-content").length; i++) {
        for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items").length; j++) {
            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel")) {
                if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value == "-") {
                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = "-";
                } else {
                    document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".tel").value;
                }
            }
            if (document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile")) {
                document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile-info").value = document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").closest(".package-number-items").querySelector(".code").value + document.getElementsByClassName("buyer-info-content")[i].getElementsByClassName("package-number-items")[j].querySelector(".mobile").value;
            }
        }
    };

    // updated login
    const properties = new Array()
    document.querySelector(".check-has-data").querySelectorAll("input").forEach(e => {
        if (e.dataset.changed) {
            if (e.dataset.changed == 1) {
                if (e.dataset.id) {
                    var obj = `{
"${e.dataset.id ? "edited" : "added"}": [
{
${e.dataset.id ? `"id":${e.dataset.id},` : ``}
"parts": [
{
"part": 1,
"values": [
 {
     ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
     "value": "${e.value}"
 }
]
}
]
}
],
"multi": false,
"propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
}`


                    properties.push(JSON.parse(obj));
                } else {
                    if (e.dataset.prpid !== '3' && e.dataset.prpid !== '5') {
                        var obj = `{
"${e.dataset.id ? "edited" : "added"}": [
{
${e.dataset.id ? `"id":${e.dataset.id},` : ``}
"parts": [
{
"part": 1,
"values": [
 {
     ${e.dataset.valueid ? `"id":${e.dataset.valueid},` : ``}
     "value": "${e.value}"
 }
]
}
]
}
],
"multi": false,
"propId": ${e.dataset.prpid ? e.dataset.prpid : '""'}
}`


                        properties.push(JSON.parse(obj));
                    }

                }




            }
        }


    })
    if (properties.length > 0) {
        var objEditUser = `{
     "data": {
     "lid": 3,
     "paramUrl": "/${document.querySelector(".check-has-data").dataset.hashid}/ar/schema_name",
     "properties": ${JSON.stringify(properties)},
     "schemaId": "${document.querySelector(".check-has-data").dataset.hashid}",
     "schemaVersion": "1.0.0",
     "usedForId": ${document.querySelector(".main-userid").value}
 }}`
        $bc.setSource("db.editUser", {
            objEditUser: objEditUser,
            rkey: document.querySelector(".main-rkey").value,
            run: true
        })
    };

    for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile")) {
            var mobile_info = "";
            if (document.querySelector(".buyer-3")) {
                mobile_info = document.querySelector(".buyer-3").querySelector(".mobile-info").value;
            } else if (document.querySelector(".buyer-2")) {
                mobile_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".mobile-info").value;
            }
            document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code1").value = mobile_info.substr(0, 3);
            document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code2").value = mobile_info.substr(3, 3);
            document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-mobile").querySelector(".code3").value = mobile_info.substr(6, 7);

        }
        if (document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email")) {
            var email_info = "";
            if (document.querySelector(".buyer-3")) {
                email_info = document.querySelector(".buyer-3").querySelector(".email").value;
            } else if (document.querySelector(".buyer-2")) {
                email_info = document.querySelector(".buyer-2").getElementsByClassName("buyer-info-content")[0].querySelector(".email").value;
            }
            document.getElementsByClassName("passenger-info-content")[i].querySelector(".passenger-email").querySelector("input").value = email_info;
        };


        for (var j = 0; j < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger").length; j++) {
            var element = document.createElement("div");
            element.className = "t-bodys";
            for (var k = 0; k < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item").length; k++) {
                if (!document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].classList.contains("unvisible")) {
                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("input[type=hidden]")) {
                        if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("input[type=hidden]").getAttribute("name").indexOf('passportexpiration') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthdate') > -1 || document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("input[type=hidden]").getAttribute("name").indexOf('birthday') > -1) {
                            var element_child = document.createElement("div");
                            element_child.className = "d-item";
                            element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("input[type=hidden]").value}</div>`;
                            element.appendChild(element_child);
                        } else {
                            if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].classList.contains("section_extra_service")) {
                                if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector(".extra_service_id_value_final")) {
                                    if (document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector(".extra_service_id_value_final").value !== '') {
                                        var element_child = document.createElement("div");
                                        element_child.className = "d-item";
                                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector(".extra_service_text").innerText}</div>`;
                                        element.appendChild(element_child);
                                    }
                                }

                            } else {
                                var element_child = document.createElement("div");
                                element_child.className = "d-item";
                                element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("input").value}</div>`;
                                element.appendChild(element_child);
                            }
                        }
                    } else {

                        var element_child = document.createElement("div");
                        element_child.className = "d-item";
                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("label").getAttribute("data-label")}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[j].getElementsByClassName("package-info-item")[k].querySelector("input").value}</div>`;
                        element.appendChild(element_child);


                    }
                }
            }
            document.querySelector(".summary-passenger-items").appendChild(element);
        };



    };


    var element = document.createElement("div");
    element.className = "t-bodys";
    for (var j = 0; j < document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item").length; j++) {
        if (!document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].classList.contains("unvisible")) {
            if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]")) {
                if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name")) {
                    if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('mobile') > -1 || document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").getAttribute("name").indexOf('tel') > -1) {
                        var element_child = document.createElement("div");
                        element_child.className = "d-item";
                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray dir-ltr">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input[type=hidden]").value}</div>`;
                        element.appendChild(element_child);
                    } else {
                        var element_child = document.createElement("div");
                        element_child.className = "d-item";
                        element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                        element.appendChild(element_child);
                    }
                }
            } else if (document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText !== 'قم باختيار الوكالة المطلوبة') {
                var element_child = document.createElement("div");
                element_child.className = "d-item";
                element_child.innerHTML = `<div class="t-head color_font">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("label").innerText}</div> <div class="t-body font-weight color_gray">${document.getElementsByClassName("buyer-info-content")[0].getElementsByClassName("package-info-item")[j].querySelector("input").value}</div>`;
                element.appendChild(element_child);
            }
        }
    }

    document.querySelector(".summary-buyer-items").appendChild(element);
    if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4824 || document.querySelector(".main-container").getAttribute("data-dmnid") == 2475) {
        $.post('/Client_Check_Member_Point_Ar_ver.2.bc', {
            userid: document.querySelector(".main-userid").value,
            product_data: document.querySelector(".coupon_data").value,
            provider_id: document.querySelector(".provider").value,
            schemaid: document.querySelector(".main-container").getAttribute("data-schemaid")
        }, function (response) {
            if (document.querySelector(".member-point-container").querySelector("#ballsWaveG")) {
                document.querySelector(".member-point-container").querySelector("#ballsWaveG").remove();
            };
            $(".member-point-container").show().html(response);
        });
    };

    if (document.querySelector(".main-container").getAttribute("data-dmnid") == 2452 || document.querySelector(".main-container").getAttribute("data-dmnid") == 3812 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4204 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4787 || document.querySelector(".main-container").getAttribute("data-dmnid") == 4705) {

        $(".counter-content").show();
        document.querySelector(".counter-content").classList.add('is-necessary')
    }
};
//<!----------------END JS SUMMARY HOTEL---------------->
//<!----------------START JS INSURANCE FLIGHTHOTEL---------------->
function show_insurance_content(element) {
    document.querySelector(".step-title").innerText = 'التأمين';
    element.setAttribute("data-step", "insurance");
    element.previousElementSibling.setAttribute("data-step", "insurance");
    check_steps("insurance");
    document.querySelector(".services-info-content").classList.add("unvisible");
    document.querySelector(".insurances-info-content").classList.remove("unvisible");
    if (document.querySelector(".insurances-info-content").getAttribute("data-load") == 0) {
        let join_birthday = ""
        for (var i = 0; i < document.getElementsByClassName("passenger-info-content").length; i++) {
            for (var s = 0; s < document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger").length; s++) {
                join_birthday += `"${document.getElementsByClassName("passenger-info-content")[i].getElementsByClassName("passenger")[s].querySelector(".birthday").value}",`

            }
        }
        $.post('/Client_Price_Insurance_Ar_ver.2.bc', {
            birthdate: join_birthday.slice(0, -1),
            fdate: document.querySelector(".invoice-form").querySelector("input[name=fdate]").value,
            tdate: document.querySelector(".invoice-form").querySelector("input[name=tdate]").value,
            inscountry: document.querySelector(".invoice-form").querySelector("input[name=inscountry]").value,
            userid: document.querySelector(".main-userid").value,


        }, function (response) {
            $(".insurances-info-content").html(response);
        });
        document.querySelector(".insurances-info-content").setAttribute("data-load", 1);
    }

};
//<!----------------END JS INSURANCE FLIGHTHOTEL---------------->
//<!----------------START JS TOUR---------------->
if (document.querySelector(".main-container").getAttribute("data-schemaid") == 249) {
    var jsonArray = new Array();
    $(".tour_view_1").each(function () {
        var question = $(this).find(".question_info").val();
        obj = new Object();
        obj["question"] = question;
        obj["answer"] = new Array();
        for (var i = 0; i < $(this).find(".section_answer_info").find(".answer_info").length; i++) {
            var index = i + 1
            InnerObj = new Object();
            InnerObj["value"] = 'value'
            InnerObj["value"] = $(this).find(".section_answer_info .answer_info:nth-child(" + index + ")").val()
            obj["answer"].push(InnerObj)
        }
        jsonArray.push(obj);
    })
    $(".tour_view_2").each(function () {
        var question = $(this).find(".question_info").val();
        obj = new Object();
        obj["question"] = question;
        obj["answer"] = new Array();
        for (var i = 0; i < $(this).find(".section_answer_info").length; i++) {
            var index = i + 1
            InnerObj = new Object();
            InnerObj["key"] = $(this).find(".section_answer_info:nth-child(" + index + ")").find(".answer_info_title").val()
            InnerObj["value"] = $(this).find(".section_answer_info:nth-child(" + index + ")").find(".answer_info_text").val()
            obj["answer"].push(InnerObj)
        }
        jsonArray.push(obj);
    })
    var toString = JSON.stringify(jsonArray);
    var toString_replace = toString.replace(/<\/?[^>]+>/gi, '')
    for (var i = 0; i < $(".nights_tour_object").length; i++) {
        var index = i + 1
        $(".table_tour").find("tbody .reservtbl_tour:nth-child(" + index + ")").find(".fdate_tour_string").text($(".nights_tour_array .nights_tour_object:nth-child(" + index + ")").find(".fdate_object").find(".sstring_nights_tour").val())
        $(".table_tour").find("tbody .reservtbl_tour:nth-child(" + index + ")").find(".tdate_tour_string").text($(".nights_tour_array .nights_tour_object:nth-child(" + index + ")").find(".tdate_object").find(".sstring_nights_tour").val())
        $(".table_tour").find("tbody .reservtbl_tour:nth-child(" + index + ")").find(".fdate_tour_mstring").text("(" + $(".nights_tour_array .nights_tour_object:nth-child(" + index + ")").find(".fdate_object").find(".mstring_nights_tour").val() + ")")
        $(".table_tour").find("tbody .reservtbl_tour:nth-child(" + index + ")").find(".tdate_tour_mstring").text("(" + $(".nights_tour_array .nights_tour_object:nth-child(" + index + ")").find(".tdate_object").find(".mstring_nights_tour").val() + ")")
        $(".table_tour").find("tbody .reservtbl_tour:nth-child(" + index + ")").find(".count-night").text('الليل ' + index)
        for (var j = 0; j < $(".each_family .info-txt").length; j++) {
            var index_td = j + 1
            $(".table_tour").find("tbody .reservtbl_tour:nth-child(" + index + ")").find(".each_family .info-txt:nth-child(" + index_td + ")").find(".family_count").text('عائلة ' + index_td + ': ')
        }
    }
    if ($(".row-rooms .tblreserv-row").length > 0) {
        $(".show-hide").show()
    } else {
        $(".show-hide").hide()
    }
    if (document.querySelector(".main-container").getAttribute("data-basiscoreid") == undefined || document.querySelector(".main-container").getAttribute("data-basiscoreid") == '') {
        $(".tour-type-text").text('الغرفة')
    } else {
        $(".tour-type-text").text('عائلة')
    }
};
//<!----------------END JS TOUR---------------->
//<!----------------START JS CIP ---------------->
//<!------------------AIRLINE AND CITY JS------------------>//
$(".input-autocomplete").each(function () {
    $(this).on("blur", function () {
        if ($(this).closest(".c-infoo").find(".co").text().length > 0) {
            if (hoverelse == 0) {
                var defresult = $(this).closest(".c-infoo").find(".co").children(".selectCountry:first").find(".txtcountry").text();
                var defresultid = $(this).closest(".c-infoo").find(".co").children(".selectCountry:first").find(".id").val();
                $(this).closest(".c-infoo").find(".input-autocomplete").val(defresult);
                $(this).closest(".c-infoo").find(".input-id").val(defresultid);
                $(this).closest(".c-infoo").find(".co").empty();
            }
        } else {
            $(this).closest(".c-infoo").find(".mini-loading").hide();
            $(this).closest(".c-infoo").find(".input-autocomplete").val("");
            $(this).closest(".c-infoo").find(".input-id").val("");
        }
    });
});

function autocomplete_search_airlinecity(element) {
    if (element.which !== 0 && !element.ctrlKey && !element.metaKey && !element.altKey) {
        upper_case =
            $(element).val().substr(0, 1).toUpperCase() +
            $(element).val().substr(1).toLowerCase();
        $(element).val(upper_case);
        if ($(element).val().length > 2) {
            $(element).closest(".c-infoo").find(".mini-loading").show();
            if ($(element).attr("data-type") == "airline") {
                $.ajax({
                    url: "/Client_Spelist_Airline.bc",
                    type: "get",
                    data: {
                        term: $(element).val(),
                    },
                    success: function (response) {
                        $(element).closest(".c-infoo").find(".mini-loading").hide();
                        $(element).closest(".c-infoo").find(".co").empty().html(response);
                    },
                });
            } else if ($(element).attr("data-type") == "city") {
                $.ajax({
                    url: "/Client_Spelist_City.bc",
                    type: "get",
                    data: {
                        term: $(element).val(),
                    },
                    success: function (response) {
                        $(element).closest(".c-infoo").find(".mini-loading").hide();
                        $(element).closest(".c-infoo").find(".co").empty().html(response);
                    },
                });
            }
        } else $(element).closest(".c-infoo").find(".co").empty();
    }
};

function empty_value(element) {
    $(element).val("");
    $(element).closest(".c-infoo").find(".input-id").val("");
};
//<!------------------ESCORT SERVICES TRANSFER  JS------------------>//
function add_cip_element(element) {
    if ($(element).attr("data-key") == 'escort') {
        var cost_cip_escort = $(element).closest(".inner_box").find(".cost_cip_escort").val()
        var unit_cip_escort = $(element).closest(".inner_box").find(".unit_cip_escort").val()
        var index = $(element).closest(".inner_box").find(".elements-container").find(".element-container").index()
        $(element).closest(".inner_box").find(".elements-container").append('<div class="element-container"><p><span class="count-escort"></span> الملف الشخصي لموظف الاستقبال<span>(سعر : <span class="cost_cip_escort_text">' + cost_cip_escort + '</span><span class="unit-content">' + unit_cip_escort + '</span>)</span></p><div class="package-info-item c-infoo"><label>الاسم</label><div class="inner-item"><input autocomplete="off" onkeyup="upperCase_key(event,this)" class="input-content necessary-cip" name="_root.escortinfo__0.firsname" type="text" /></div></div><div class="package-info-item c-infoo"><label>اللقب</label><div class="inner-item"><input  autocomplete="off" onkeyup="upperCase_key(event,this)" class="input-content  necessary-cip" name="_root.escortinfo__0.lastname" type="text" /></div></div><div class="package-info-item c-infoo"><label>الجنس</label><div class="inner-item"><select name="_root.escortinfo__0.gender"><option value="0">أنثى</option><option value="1">ذكر</option></select></div></div><div class="clr"></div></div>')
        calculate_cip_total(cost_cip_escort, 'plus', 'escort')
        for (var i = 1; i <= $(element).closest(".inner_box").find(".element-container").length; i++) {
            $(element).closest(".inner_box").find(".element-container:nth-child(" + i + ")").find('.count-escort').text(i + '-')
        }
        set_names_cip_passengers(element, 'escort')
    }
    $(".cost_cip_escort_text").each(function () {
        if (!$(this).text().includes(',')) {
            $(this).text(new Intl.NumberFormat().format($(this).text()))
        }
    })
};

function remove_cip_element(element) {
    var cost_cip_escort = $(element).closest(".inner_box").find(".cost_cip_escort").val()
    $(element).closest(".inner_box").find(".elements-container").children('.element-container').last().remove()
    calculate_cip_total(cost_cip_escort, 'minus', 'escort')
};

function check_cip_element(element) {
    if ($(element).attr("data-key") == 'transfer') {
        var cost_cip_transfer = $(element).closest(".element-row").find(".cost_cip_transfer").val();
        if ($(element).is(':checked')) {
            $(element).closest(".element-row").find(".elements-container").append(`<div class="element-container">
   <div class="package-info-item c-infoo check-element">
       <input type="hidden" class="item_transfer_select" value="1" />
       <div class="inner-item">
           <select onchange="check_cip_element(this)" data-key="add_item_transfer">
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
           </select>
       </div>

   </div>
   <div class="clr"></div>
   <div class="inner-elements-container">
       <div class="inner-element-container">
           <input type="hidden" value="${$(element).closest(" .element-row").find(".transferid").val()
                }" name="_root.transfers__${$(element).closest(".element-row").index()}.transferid"/><input type="hidden" value="${$(element).closest(".element-row").find(".car_name").val()}" name="_root.transfers__${$(element).closest(".element-row").index()
                }.car_name"/><div class="package-info-item c-infoo"><label>العنوان</label><div class="inner-item"><input class="input-content address-cip necessary-cip" name="_root.transfers__${$(element).closest(".element-row").index()
                }.address" type="text" /></div></div><div class="package-info-item c-infoo"><label>وقت الحضور</label><div class="inner-item"><input readonly class="input-content clockpicker necessary-cip" name="_root.transfers__${$(element).closest(".element-row").index()
                }.time" type="text" /></div></div><div class="package-info-item c-infoo mobile-cip-container"><label>رقم التنسيق (الهاتف المحمول)</label>
                   <div class="package-number-items">
                       <div class="package-number-item">
                           <div class="inner-item"><input type="text" value=""
                                   class="necessary-cip input-content mobile-cip" name="_root.transfers__${$(element).closest(".element-row").index()}.phone"
                                   onkeyup="this.value=this.value.replace(/[^0-9]/g, '');" /></div>
                       </div>
                       <div class="package-code-item has-select">
                           <div class="inner-item"><input type="text" value="+98"
                                   onclick="toggle_codeCountry(this)" class="code" name=""
                                   oninput="autoComplete_search(event,this,'code')"  onblur="autoFill_search(event,this,'package-code-item')" 
                                   onkeyup="tab_key(event,this);" /></div>
                           <ul class="drop-item country-code">

                           </ul>
                       </div>
                       <div class="clr"></div>
                   </div>
               </div></div><div class="clr"></div></div>`)
            $('.clockpicker').clockpicker({
                placement: 'bottom',
                align: 'left',
                autoclose: true,
                'default': 'now'
            });
            calculate_cip_total(cost_cip_transfer, 'plus', 'transfer')
        } else {
            $(element).closest(".element-row").find(".elements-container").empty()
            $(element).closest(".element-row").find(".cip_transfer_sum").empty()
            calculate_cip_total(cost_cip_transfer, 'minus', 'transfer')
        }

    } else if ($(element).attr("data-key") == 'add_item_transfer') {
        $(element).closest(".element-row").find(".inner-elements-container").empty()
        for (var i = 0; i < $(element).val(); i++) {
            $(element).closest(".element-row").find(".inner-elements-container").append(`<div class="inner-element-container">
<input type="hidden" value="${$(element).closest(" .element-row").find(".transferid").val()}" name="_root.transfers__0.transferid"/><input type="hidden" value="${$(element).closest(".element-row").find(".car_name").val()
                }" name="_root.transfers__0.car_name"/><div class="package-info-item c-infoo"><label>العنوان</label><div class="inner-item">
       <input class="input-content address-cip necessary-cip" name="_root.transfers__0.address"  type="text" />
   </div></div><div class="package-info-item c-infoo"><label>وقت الحضور</label>
       <div class="inner-item">
           <input class="input-content clockpicker necessary-cip" readonly name="_root.transfers__0.time" type="text" /></div></div>
           <div class="package-info-item c-infoo mobile-cip-container"><label>رقم التنسيق (الهاتف المحمول)</label>
                   <div class="package-number-items">
                       <div class="package-number-item">
                           <div class="inner-item"><input type="text" value=""
                                   class="necessary-cip input-content mobile-cip" name="_root.transfers__0.phone"
                                   onkeyup="this.value=this.value.replace(/[^0-9]/g, '');" /></div>
                       </div>
                       <div class="package-code-item has-select">
                           <div class="inner-item"><input type="text" value="+98" 
                                   onclick="toggle_codeCountry(this)" class="code" name=""
                                   oninput="autoComplete_search(event,this,'code')" onblur="autoFill_search(event,this,'package-code-item')" 
                                   onkeyup="tab_key(event,this);" /></div>
                           <ul class="drop-item country-code">

                           </ul>
                       </div>
                       <div class="clr"></div>
                   </div>
               </div><div class="clr"></div></div>`)
            $('.clockpicker').clockpicker({
                placement: 'bottom',
                align: 'left',
                autoclose: true,
                'default': 'now'
            });
        }
        if ($(element).val() == 1) {
            $(element).closest(".element-row").find(".cip_transfer_sum").empty()
        } else {
            var cost_cip_transfer_sum = parseFloat($(element).closest(".element-row").find(".cost_cip_transfer").val()) * parseFloat($(element).val())
            $(element).closest(".element-row").find(".cip_transfer_sum").html('<span>المجموع: <span class="cost_cip_text">' + cost_cip_transfer_sum + ' </span></span><span class="unit-content">' + $(element).closest(".element-row").find(".unit_cip_transfer").val() + '</span>')
        }

        var plusOrMinus = parseFloat($(element).val()) - parseFloat($(element).closest(".element-row").find(".item_transfer_select").val())
        $(element).closest(".element-row").find(".item_transfer_select").val($(element).val())
        var cost_cip_transfer_sum2 = parseFloat($(element).closest(".element-row").find(".cost_cip_transfer").val()) * plusOrMinus
        if (plusOrMinus > 0) {
            calculate_cip_total(Math.abs(cost_cip_transfer_sum2), 'plus', 'transfer')
        } else {

            calculate_cip_total(Math.abs(cost_cip_transfer_sum2), 'minus', 'transfer')
        }
        set_names_cip_passengers(element, 'transfer')

    } else if ($(element).attr("data-key") == 'service') {
        var cost_cip_service = $(element).closest(".element-row").find(".cost_cip_service").val()
        if ($(element).is(':checked')) {
            $(element).closest(".element-row").find(".elements-container").append('<div class="element-container"><div class="c-infoo check-element"><input type="hidden" class="item_service_select" value="1"/><input type="hidden" value="' + $(element).closest(".element-row").find(".sname").val() + '" name="_root.services__' + $(element).closest(".element-row").index() + '.service"/><input type="hidden" value="' + $(element).closest(".element-row").find(".sid_service").val() + '" name="_root.services__' + $(element).closest(".element-row").index() + '.sid"/><select onchange="check_cip_element(this)" name="_root.services__' + $(element).closest(".element-row").index() + '.count" data-key="add_item_service"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div><div class="clr"></div>')
            calculate_cip_total(cost_cip_service, 'plus', 'service')
        } else {
            $(element).closest(".element-row").find(".elements-container").empty()
            calculate_cip_total(cost_cip_service, 'minus', 'service')
        }
    } else if ($(element).attr("data-key") == 'add_item_service') {
        if ($(element).val() == 1) {
            $(element).closest(".element-row").find(".cip_service_sum").empty()
        } else {
            var cost_cip_service_sum = parseFloat($(element).closest(".element-row").find(".cost_cip_service").val()) * parseFloat($(element).val())
            $(element).closest(".element-row").find(".cip_service_sum").html('<span>المجموع: <span class="cost_cip_text">' + cost_cip_service_sum + '</span></span><span class="unit-content">' + $(element).closest(".element-row").find(".unit_cip_service").val() + '</span>')
        }
        var plusOrMinus = parseFloat($(element).val()) - parseFloat($(element).closest(".element-row").find(".item_service_select").val())
        $(element).closest(".element-row").find(".item_service_select").val($(element).val())
        var cost_cip_transfer_sum2 = parseFloat($(element).closest(".element-row").find(".cost_cip_service").val()) * plusOrMinus
        if (plusOrMinus > 0) {
            calculate_cip_total(Math.abs(cost_cip_transfer_sum2), 'plus', 'transfer')
        } else {

            calculate_cip_total(Math.abs(cost_cip_transfer_sum2), 'minus', 'transfer')
        }
    }

    $(".cost_cip_text").each(function () {
        if (!$(this).text().includes(',')) {
            $(this).text(new Intl.NumberFormat().format($(this).text()))
        }
    })
};

function check_wheelchair(element) {
    var cost_cip_wheelchair = $(".cost_cip_wheelchair").val()
    if ($(element).is(':checked')) {
        $(element).val('1')
        $(element).closest(".passengerInfo").find(".check_wheelchair").val('1')
        $(element).closest(".passenger-info-content").find(".title ").after('<span class="cost_wheelchair">(رسوم الكرسي المتحرك: <span class="cost_cip_text">' + $(".cost_cip_wheelchair").val() + '</span><span class="unit-content"> ' + $(".unit_cip_wheelchair").val() + ' </span>)</span>')
        calculate_cip_total(cost_cip_wheelchair, 'plus', 'wheelchair')
    } else {
        $(element).val('0')
        $(element).closest(".passenger-info-content").find(".check_wheelchair").val('0')
        $(element).closest(".passenger-info-content").find(".cost_wheelchair").remove()
        calculate_cip_total(cost_cip_wheelchair, 'minus', 'wheelchair')
    }
    $(element).closest(".passenger-info-content").find(".cost_cip_text").each(function () {
        if (!$(this).text().includes(',')) {
            $(this).text(new Intl.NumberFormat().format($(this).text()))
        }
    })
};

function set_names_cip_passengers(element, type) {
    if (type == 'escort') {
        for (var i = 0; i < $(element).closest(".inner_box").find('.element-container').length; i++) {
            $(element).closest(".inner_box").find(".element-container:nth-child(" + i + ")").find('input').each(function () {
                var prev_name = $(this).attr('name')

                var new_name = prev_name.replace("0", i)
                $(this).attr('name', new_name)
            })
        }
    } else if (type == 'transfer') {
        var index_parent = $(element).closest(".element-row").index()
        for (var i = 0; i < $(element).closest(".element-row").find('.inner-element-container').length; i++) {
            $(element).closest(".element-row").find(".inner-element-container:nth-child(" + i + ")").find('input').each(function () {
                var prev_name = $(this).attr('name')

                var index = i + index_parent.toString()
                var new_name = prev_name.replace("0", index)
                $(this).attr('name', new_name)
            })
        }
    } else if (type == 'service') {
        for (var i = 0; i < $(element).closest(".inner_box").find(".element-row").length; i++) {
            $(element).closest(".inner_box").find(".element-row:nth-child(" + i + ")").find('select').each(function () {
                var prev_name = $(this).attr('name')

                var new_name = prev_name.replace("0", i)
                $(this).attr('name', new_name)
            })
        }
    }
};
var array_num = new Array();

function calculate_cip_total(element, plusMinus, type) {
    if (plusMinus == 'plus') {
        array_num.push(element);
        for (var i = 0; i < document.getElementsByClassName("firstpay-price").length; i++) {
            document.getElementsByClassName("firstpay-price")[i].innerText = new Intl.NumberFormat().format(parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) + parseFloat(element));
        };
        document.querySelector(".firstpay-section").setAttribute("data-output", parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) + parseFloat(element));

    } else {
        array_num.splice(array_num.indexOf(element), 1);
        for (var i = 0; i < document.getElementsByClassName("firstpay-price").length; i++) {
            document.getElementsByClassName("firstpay-price")[i].innerText = new Intl.NumberFormat().format(parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) - parseFloat(element));
        };
        document.querySelector(".firstpay-section").setAttribute("data-output", parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) - parseFloat(element));


    }


};
//<!----------------END JS CIP---------------->
//<!----------------START JS VIS---------------->
//<!------LOAD UPLOAD INFO------->//
$(".upload-info").load('/Client_Upload_Info.bc', function () {
    create_passengers_form('default', document.getElementById('permitid-value').value, document.getElementById('formid-value').value);
});
//<!------FORM PASSENGERS------->//
function create_passengers_form(todo, permitid_value, formid_value) {
    const schema = JSON.parse(document.querySelector(".passenger-form-value").getAttribute("data-output"));
    for (var i = 0; i < schema.length; i++) {
        var internal = "internal";
        if (document.querySelector(".internal").value == 0) {
            internal = "external"
        }
        var title = schema[i].title;
        var type_element = 0;
        if (title.indexOf("بالغ") > -1) {
            type_element = 2;
        } else if (title.indexOf("طفل") > -1) {
            type_element = 1;
        }
        var element = document.createElement("div");
        element.className = "passenger-info-content box-content";
        element.setAttribute("data-index", i)
        var element_title = document.createElement("div");
        element_title.className = "title  font_14";
        element_title.innerHTML =
            `<input class="passenger-type" type="hidden" value=${type_element} name="_root.passengerinfo__${i}.passengerinfo.type"/><div class="add-passengers" onclick="add_visa_passenger(this)" data-active="0"><i class="fa fa-plus"></i>إضافة راكب </div><div class="clr"></div><div class="flex-justify"><div class="passenger-title font-weight">${title}</div><div class="prev-passengers" data-open="0" data-index="${i}" onclick="show_passengersList(this)"><svg data-v-2919ee3e="" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" name="user-clock" color="inherit" type="regular" class="mr-icon-svg svg-inline--fa fa-user-clock"><path data-v-2919ee3e="" fill="" d="M496 224c-79.63 0-144 64.38-144 144s64.38 144 144 144s144-64.38 144-144S575.6 224 496 224zM544 384h-54.25C484.4 384 480 379.6 480 374.3V304c0-8.836 7.164-16 16-16c8.838 0 16 7.164 16 16v48h32c8.838 0 16 7.164 16 15.1S552.8 384 544 384zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48zM395 512H32c-17.67 0-32-14.33-32-32c0-97.2 78.8-176 176-176h96c19.87 0 38.89 3.441 56.7 9.508c-4.963 15.24-7.787 31.41-8.383 48.17C305.4 355.5 289.1 352 272 352h-96c-65.16 0-119.1 48.95-127 112h299.6C360.9 482.8 376.6 499.1 395 512z" class=""></path></svg>قائمة المسافرين السابقين</div></div>`;
        element.appendChild(element_title);
        var element_children = document.createElement("div");
        element_children.className = "passenger-info-items";

        for (var j = 0; j < schema[i].form.length; j++) {
            var type = schema[i].form[j].type;
            if (type == 140) {
                var element_child_title = schema[i].form[j].question;
                var element_child = document.createElement("div");
                element_child.className = "package-info-item has-select-input";
                var label = document.createElement("label");
                label.innerHTML = element_child_title;
                label.setAttribute("data-label", element_child_title);
                element_child.appendChild(label);
                var string = `<div class="inner-item"><input class="gender necessary" type="text" onclick="toggle_gender(this)" onkeyup="tab_key(event,this)" readonly="true"/><input class="gender-id" type="hidden"  `;
                for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                    if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                        .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'class' && schema[i].form[j].attrs[y].attr.name !== 'type') {
                        string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[y]
                            .attr
                            .value + '" ';
                    }

                };

                string += `/></div><ul class='drop-item wide'>`;
                for (var x = 0; x < schema[i].form[j].values.length; x++) {
                    string +=
                        `<li onclick="select_gender_val(this)" class="li-item" data-value="${schema[i].form[j].values[x].value.value}">${schema[i].form[j].values[x].value.title}</li>`
                };
                string += `</ul>`;
                element_child.innerHTML += string;
                element_children.appendChild(element_child);
            } else if (type != 132) {
                var element_child_title = schema[i].form[j].question;
                if (element_child_title == 'الاسم') {
                    element_child_title = 'الاسم الأول باللغة الإنجليزية';
                } else if (element_child_title == 'اللقب') {
                    element_child_title = 'اللقب باللغة الإنجليزية';
                } else if (element_child_title == 'رقم جواز السفر ') {
                    element_child_title = 'رقم جواز السفر';
                } else if (element_child_title == 'انتهاء صلاحية جواز السفر') {
                    element_child_title = 'انتهاء صلاحية جواز السفر';
                } else if (element_child_title == 'بلد إصدار جواز السفر') {
                    element_child_title = 'بلد إصدار جواز السفر';
                } else if (element_child_title == 'تاریخ الولادة') {
                    element_child_title = `${internal == 'internal' ? 'تاریخ الولادة' : 'تاريخ الميلاد'}`;
                };
                if (element_child_title == 'تاريخ الميلاد' || element_child_title == 'تاریخ الولادة') {
                    var element_child = document.createElement("div");
                    element_child.className = "package-info-item";
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", "تاریخ الولادة");
                    element_child.appendChild(label);
                    var string = `<div class="passenger-date-items"><div class="passenger-date-item has-select"
                                                       >
                                                       <div class="inner-item"><input type="text"  onclick="toggle_date(this,'day')" placeholder="يوم" class="day necessary" oninput="autoComplete_search(event,this,'day')"  onblur="autoFill_search(event,this,'passenger-date-item')"  onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                       <ul class="drop-item">
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="1">1</li>
<li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="2">2</li>
<li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="3">3</li>
<li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="4">4</li>
<li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="5">5</li>
<li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="6">6</li>
<li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="7">7</li>
<li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="8">8</li>
<li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="9">9</li>
<li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="10">10</li>
<li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="11">11</li>
<li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="12">12</li>
<li onclick="select_date_val(this)" class="li-item" data-id="13" data-value="13">13</li>
<li onclick="select_date_val(this)" class="li-item" data-id="14" data-value="14">14</li>
<li onclick="select_date_val(this)" class="li-item" data-id="15" data-value="15">15</li>
<li onclick="select_date_val(this)" class="li-item" data-id="16" data-value="16">16</li>
<li onclick="select_date_val(this)" class="li-item" data-id="17" data-value="17">17</li>
<li onclick="select_date_val(this)" class="li-item" data-id="18" data-value="18">18</li>
<li onclick="select_date_val(this)" class="li-item" data-id="19" data-value="19">19</li>
<li onclick="select_date_val(this)" class="li-item" data-id="20" data-value="20">20</li>
<li onclick="select_date_val(this)" class="li-item" data-id="21" data-value="21">21</li>
<li onclick="select_date_val(this)" class="li-item" data-id="22" data-value="22">22</li>
<li onclick="select_date_val(this)" class="li-item" data-id="23" data-value="23">23</li>
<li onclick="select_date_val(this)" class="li-item" data-id="24" data-value="24">24</li>
<li onclick="select_date_val(this)" class="li-item" data-id="25" data-value="25">25</li>
<li onclick="select_date_val(this)" class="li-item" data-id="26" data-value="26">26</li>
<li onclick="select_date_val(this)" class="li-item" data-id="27" data-value="27">27</li>
<li onclick="select_date_val(this)" class="li-item" data-id="28" data-value="28">28</li>
<li onclick="select_date_val(this)" class="li-item" data-id="29" data-value="29">29</li>
<li onclick="select_date_val(this)" class="li-item" data-id="30" data-value="30">30</li>
<li onclick="select_date_val(this)" class="li-item" data-id="31" data-value="31">31</li>
                                             
                                                       </ul>

                                                   </div>
                                                   <div class="passenger-date-item has-select"
                                                      >
                                                      <div class="inner-item"><input type="text"  onclick="toggle_date(this,'month')"  placeholder="شهر" class="month necessary" oninput="autoComplete_search(event,this,'month')" onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="tab_key(event,this);"  data-id=""/></div>
                                                       <ul class="drop-item">
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="January">
                                                               January
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="February">
                                                               February
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="March">March
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="April">April
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="May">May
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="June">June
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="July">July
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="August">
                                                               August</li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="September">
                                                               September
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="October">
                                                               October
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="November">
                                                               November
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="December">
                                                               December
                                                           </li>
                                                       </ul>
                                                   </div>
                                                   <div class="passenger-date-item has-select"
                                                       >
                                                       <div class="inner-item"><input type="text" onclick="toggle_date(this,'year-birthdate')" placeholder="سنة" class="year necessary" oninput="autoComplete_search(event,this,'year-birthdate')" onblur="autoFill_search(event,this,'passenger-date-item')"  onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                       <ul class="drop-item">
                                                       <li onclick="select_date_val(this)" class="li-item" data-id="2024" data-value="2024">2024</li>
                                                        <li onclick="select_date_val(this)" class="li-item" data-id="2024" data-value="2024">2024</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2022" data-value="2022">2022</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2021" data-value="2021">2021</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2020" data-value="2020">2020</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2019" data-value="2019">2019</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2018" data-value="2018">2018</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2017" data-value="2017">2017</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2016" data-value="2016">2016</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2015" data-value="2015">2015</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2014" data-value="2014">2014</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2013" data-value="2013">2013</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2012" data-value="2012">2012</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2011" data-value="2011">2011
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2010" data-value="2010">2010
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2009" data-value="2009">2009
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2008" data-value="2008">2008
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2007" data-value="2007">2007
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2006" data-value="2006">2006
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2005" data-value="2005">2005
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2004" data-value="2004">2004
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2003" data-value="2003">2003
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2002" data-value="2002">2002
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2001" data-value="2001">2001
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="2000" data-value="2000">2000
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1999" data-value="1999">1999
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1998" data-value="1998">1998
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1997" data-value="1997">1997
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1996" data-value="1996">1996
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1995" data-value="1995">1995
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1994" data-value="1994">1994
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1993" data-value="1993">1993
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1992" data-value="1992">1992
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1991" data-value="1991">1991
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1990" data-value="1990">1990
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1989" data-value="1989">1989
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1988" data-value="1988">1988
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1987" data-value="1987">1987
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1986" data-value="1986">1986
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1985" data-value="1985">1985
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1984" data-value="1984">1984
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1983" data-value="1983">1983
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1982" data-value="1982">1982
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1981" data-value="1981">1981
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1980" data-value="1980">1980
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1979" data-value="1979">1979
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1978" data-value="1978"> 1978
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1977" data-value="1977">1977
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1976" data-value="1976">1976
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1975" data-value="1975">1975
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1974" data-value="1974">1974
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1973" data-value="1973">1973
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1972" data-value="1972"> 1972
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1971" data-value="1971">1971
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1970" data-value="1970">1970
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1969" data-value="1969">1969
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1968" data-value="1968">1968
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1967" data-value="1967">1967
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1966" data-value="1966">1966
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1965" data-value="1965"> 1965
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1964" data-value="1964">1964
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1963" data-value="1963">1963
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1962" data-value="1962">1962
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1961" data-value="1961">1961
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1960" data-value="1960">1960
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1959" data-value="1959">1959
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1958" data-value="1958">1958
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1957" data-value="1957">1957
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1956" data-value="1956">1956
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1955" data-value="1955">1955
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1954" data-value="1954">1954
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1953" data-value="1953">1953
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1952" data-value="1952">1952
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1951" data-value="1951">1951
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1950" data-value="1950">1950
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1949" data-value="1949">1949
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1948" data-value="1948">1948
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1947" data-value="1947">1947
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1946" data-value="1946">1946
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1945" data-value="1945">1945
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1944" data-value="1944">1944
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1943" data-value="1943">1943
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1942" data-value="1942">1942
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1941" data-value="1941">1941
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1940" data-value="1940">1940
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1939" data-value="1939">1939
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1938" data-value="1938">1938
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1937" data-value="1937">1937
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1936" data-value="1936">1936
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1935" data-value="1935">1935
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1934" data-value="1934">1934
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1933" data-value="1933">1933
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1932" data-value="1932">1932
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1931" data-value="1931">1931
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1930" data-value="1930">1930
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1929" data-value="1929">1929
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1928" data-value="1928">1928
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1927" data-value="1927">1927
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1926" data-value="1926"> 1926
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1925" data-value="1925"> 1925
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1924" data-value="1924">1924
</li>
<li onclick="select_date_val(this)" class="li-item" data-id="1923" data-value="1923">1923
</li>

                                                       </ul>
                                                   </div><input type="hidden" `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'type') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);

                } else if (element_child_title == 'انتهاء صلاحية جواز السفر') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item ${internal} unvisible`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);

                    var string = `<div class="passenger-date-items"> <div class="passenger-date-item has-select"
                                                      >
                                                      <div class="inner-item"><input type="text"  onclick="toggle_date(this,'day')" placeholder="يوم" class="day${internal == 'internal' ? '' : ' '}" oninput="autoComplete_search(event,this,'day')"  onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                       <ul class="drop-item">
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="1">1</li>
<li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="2">2</li>
<li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="3">3</li>
<li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="4">4</li>
<li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="5">5</li>
<li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="6">6</li>
<li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="7">7</li>
<li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="8">8</li>
<li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="9">9</li>
<li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="10">10</li>
<li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="11">11</li>
<li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="12">12</li>
<li onclick="select_date_val(this)" class="li-item" data-id="13" data-value="13">13</li>
<li onclick="select_date_val(this)" class="li-item" data-id="14" data-value="14">14</li>
<li onclick="select_date_val(this)" class="li-item" data-id="15" data-value="15">15</li>
<li onclick="select_date_val(this)" class="li-item" data-id="16" data-value="16">16</li>
<li onclick="select_date_val(this)" class="li-item" data-id="17" data-value="17">17</li>
<li onclick="select_date_val(this)" class="li-item" data-id="18" data-value="18">18</li>
<li onclick="select_date_val(this)" class="li-item" data-id="19" data-value="19">19</li>
<li onclick="select_date_val(this)" class="li-item" data-id="20" data-value="20">20</li>
<li onclick="select_date_val(this)" class="li-item" data-id="21" data-value="21">21</li>
<li onclick="select_date_val(this)" class="li-item" data-id="22" data-value="22">22</li>
<li onclick="select_date_val(this)" class="li-item" data-id="23" data-value="23">23</li>
<li onclick="select_date_val(this)" class="li-item" data-id="24" data-value="24">24</li>
<li onclick="select_date_val(this)" class="li-item" data-id="25" data-value="25">25</li>
<li onclick="select_date_val(this)" class="li-item" data-id="26" data-value="26">26</li>
<li onclick="select_date_val(this)" class="li-item" data-id="27" data-value="27">27</li>
<li onclick="select_date_val(this)" class="li-item" data-id="28" data-value="28">28</li>
<li onclick="select_date_val(this)" class="li-item" data-id="29" data-value="29">29</li>
<li onclick="select_date_val(this)" class="li-item" data-id="30" data-value="30">30</li>
<li onclick="select_date_val(this)" class="li-item" data-id="31" data-value="31">31</li>
                                                       </ul>

                                                   </div>
                                                   <div class="passenger-date-item has-select"
                                                     >
                                                     <div class="inner-item"><input type="text"  onclick="toggle_date(this,'month')" placeholder="شهر" class="month${internal == 'internal' ? '' : ' '}"   oninput="autoComplete_search(event,this,'month')" onblur="autoFill_search(event,this,'passenger-date-item')"  onkeyup="tab_key(event,this);" data-id=""/></div>
                                                       <ul class="drop-item">
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="January">
                                                               January
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="February">
                                                               February
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="March">March
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="April">April
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="May">May
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="June">June
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="July">July
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="August">
                                                               August</li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="September">
                                                               September
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="October">
                                                               October
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="November">
                                                               November
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="December">
                                                               December
                                                           </li>
                                                       </ul>
                                                   </div>
                                                   <div class="passenger-date-item has-select"
                                                      >
                                                      <div class="inner-item"><input type="text"  onclick="toggle_date(this,'year-passport')"  placeholder="سنة" class="year${internal == 'internal' ? '' : ' '}" oninput="autoComplete_search(event,this,'year-passport')" onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                      <ul class="drop-item">
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2024" data-value="2024">2024
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2025" data-value="2025">2025
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2026" data-value="2026">2026
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2027" data-value="2027">2027
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2028" data-value="2028">2028
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2029" data-value="2029">2029
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2030" data-value="2030">2030
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2031" data-value="2031">2031
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2032" data-value="2032">2032
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2033" data-value="2033">2033
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2034" data-value="2034">2034
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2035" data-value="2035">2035
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2036" data-value="2036">2036
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2037" data-value="2037">2037
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2038" data-value="2038">2038
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2039" data-value="2039">2039
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2040" data-value="2040">2040
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2041" data-value="2041">2041
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2042" data-value="2042">2042
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2043" data-value="2043">2043
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2044" data-value="2044">2044
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2045" data-value="2045">2045
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2046" data-value="2046">2046
                                                      </li>
                                                  </ul>
                                               </div><input type="hidden" value="-" `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'type' && schema[i].form[j].attrs[y].attr.name !== 'class') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);
                } else if (element_child_title == 'تاريخ إصدار الجواز') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item ${internal}`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);

                    var string = `<div class="passenger-date-items"> <div class="passenger-date-item has-select"
                                                      >
                                                      <div class="inner-item"><input type="text"  onclick="toggle_date(this,'day')" placeholder="يوم" class="day${internal == 'internal' ? '' : ' necessary'}" oninput="autoComplete_search(event,this,'day')" onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                       <ul class="drop-item">
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="1">1</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="2">2</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="3">3</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="4">4</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="5">5</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="6">6</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="7">7</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="8">8</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="9">9</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="10">10</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="11">11</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="12">12</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="13" data-value="13">13</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="14" data-value="14">14</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="15" data-value="15">15</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="16" data-value="16">16</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="17" data-value="17">17</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="18" data-value="18">18</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="19" data-value="19">19</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="20" data-value="20">20</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="21" data-value="21">21</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="22" data-value="22">22</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="23" data-value="23">23</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="24" data-value="24">24</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="25" data-value="25">25</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="26" data-value="26">26</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="27" data-value="27">27</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="28" data-value="28">28</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="29" data-value="29">29</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="30" data-value="30">30</li>
                <li onclick="select_date_val(this)" class="li-item" data-id="31" data-value="31">31</li>
                                                       </ul>
                
                                                   </div>
                                                   <div class="passenger-date-item has-select"
                                                     >
                                                     <div class="inner-item"><input type="text"  onclick="toggle_date(this,'month')" placeholder="شهر" class="month${internal == 'internal' ? '' : ' necessary'}"   oninput="autoComplete_search(event,this,'month')" onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="tab_key(event,this);" data-id=""/></div>
                                                       <ul class="drop-item">
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="January">
                                                               January
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="February">
                                                               February
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="March">March
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="April">April
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="May">May
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="June">June
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="July">July
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="August">
                                                               August</li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="September">
                                                               September
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="October">
                                                               October
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="November">
                                                               November
                                                           </li>
                                                           <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="December">
                                                               December
                                                           </li>
                                                       </ul>
                                                   </div>
                                                   <div class="passenger-date-item has-select"
                                                      >
                                                      <div class="inner-item"><input type="text"  onclick="toggle_date(this,'year-visa')"  placeholder="سنة" class="year${internal == 'internal' ? '' : ' necessary'}" oninput="autoComplete_search(event,this,'year-visa')" onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id=""/></div>
                                                      <ul class="drop-item">
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2000" data-value="2000">2000
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2001" data-value="2001">2001
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2002" data-value="2002">2002
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2003" data-value="2003">2003
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2004" data-value="2004">2004
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2005" data-value="2005">2005
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2006" data-value="2006">2006
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2007" data-value="2007">2007
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2008" data-value="2008">2008
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2009" data-value="2009">2009
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2010" data-value="2010">2010
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2011" data-value="2011">2011
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2012" data-value="2012">2012
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2013" data-value="2013">2013
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2014" data-value="2014">2014
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2015" data-value="2015">2015
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2016" data-value="2016">2016
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2017" data-value="2017">2017
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2018" data-value="2018">2018
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2019" data-value="2019">2019
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2020" data-value="2020">2020
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2021" data-value="2021">2021
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2022" data-value="2022">2022
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2023" data-value="2023">2023
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2024" data-value="2024">2024
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2025" data-value="2025">2025
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2026" data-value="2026">2026
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2027" data-value="2027">2027
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2028" data-value="2028">2028
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2029" data-value="2029">2029
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2030" data-value="2030">2030
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2031" data-value="2031">2031
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2032" data-value="2032">2032
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2033" data-value="2033">2033
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2034" data-value="2034">2034
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2035" data-value="2035">2035
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2036" data-value="2036">2036
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2037" data-value="2037">2037
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2038" data-value="2038">2038
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2039" data-value="2039">2039
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2040" data-value="2040">2040
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2041" data-value="2041">2041
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2042" data-value="2042">2042
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2043" data-value="2043">2043
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2044" data-value="2044">2044
                                                      </li>
                                                      <li onclick="select_date_val(this)" class="li-item" data-id="2045" data-value="2045">2045
                                                      </li>
                                                  </ul>
                                               </div><input type="hidden" `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'type') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);
                } else if (element_child_title == 'الجنسية') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item has-select-input`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    var input_name = "";
                    var string = `<div class="inner-item"><input value="ایران" data-value="ایران" oninput="autoComplete_search(event,this,'area')" onblur="autoFill_search(event,this,'package-info-item')" onkeyup="tab_key(event,this);" onclick="toggle_area(this)"  `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'name') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                        if (schema[i].form[j].attrs[y].attr.name == 'name') {
                            input_name = schema[i].form[j].attrs[y].attr.value;
                        }
                    };
                    string += `/></div><input type="hidden" value="1002236" name="${input_name}" class="area-id issuecountry"/><ul class="drop-item wide">
                           <li onclick="select_area_val(this)" class="li-item" data-value="ایران" data-id="1002236">ایران</li>
<li onclick="select_area_val(this)" class="li-item" data-value="أذربيجان" data-id="1002227">أذربيجان</li>
<li onclick="select_area_val(this)" class="li-item" data-value="الأرجنتين" data-id="1002172">الأرجنتين</li>
<li onclick="select_area_val(this)" class="li-item" data-value="آروبا" data-id="1002139">آروبا</li>
<li onclick="select_area_val(this)" class="li-item" data-value="جنوب أفريقيا" data-id="1002126">جنوب أفريقيا</li>
<li onclick="select_area_val(this)" class="li-item" data-value="أفريقيا الوسطى" data-id="1002087">أفريقيا الوسطى</li>
<li
   onclick="select_area_val(this)" class="li-item" data-value="ألبانيا"
   data-id="1002040">ألبانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="ألمانيا"
   data-id="1002052">ألمانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="أنتيغوا وبربودا"
   data-id="1002138">أنتيغوا وبربودا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أندورا" data-id="1002041">أندورا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أنغولا" data-id="1002081">أنغولا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أنغيلا" data-id="1002137">أنغيلا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اتریش" data-id="1002042">اتریش</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أثيوبيا" data-id="1002096">أثيوبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الأردن" data-id="1002239">الأردن</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أرمينيا" data-id="1002226">أرمينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوروغواي" data-id="1002180">أوروغواي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="إريتريا" data-id="1002095">إريتريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوزبكستان" data-id="1002230">أوزبكستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="إسبانيا" data-id="1002077">إسبانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أستراليا" data-id="1002187">أستراليا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="إستونيا" data-id="1002048">إستونيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سلوفاكيا" data-id="1002075">سلوفاكيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سلوفينيا" data-id="1002076">سلوفينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أفغانستان" data-id="1002212">أفغانستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الاكوادور" data-id="1002176">الاكوادور</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الجزائر" data-id="1002080">الجزائر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سلفادور" data-id="1002149">سلفادور</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الإمارات العربية المتحدة" data-id="1002248">الإمارات العربية المتحدة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أندونيسيا" data-id="1002256">أندونيسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="انجلترا" data-id="1167330">انجلترا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوكرانيا" data-id="1002039">أوكرانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوغندا" data-id="1002132">أوغندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ولايات ميكرونيزيا الموحدة" data-id="1002196">ولايات ميكرونيزيا الموحدة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ایالات متحده" data-id="1002211">ایالات متحده</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الولايات المتحدة الجزر الهامشية" data-id="1198858">الولايات المتحدة الجزر الهامشية</li><li onclick="select_area_val(this)" class="li-item" data-value="ایتالیا" data-id="1002059">ایتالیا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أيسلندا" data-id="1002034">أيسلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بربادوس" data-id="1002141">بربادوس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر البهاما" data-id="1002140">جزر البهاما</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البحرين" data-id="1002234">البحرين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البرازيل" data-id="1002174">البرازيل</li><li
   onclick="select_area_val(this)" class="li-item" data-value="برمودا" data-id="1002167">برمودا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بروناي" data-id="1002250">بروناي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بيلاروسيا" data-id="1002037">بيلاروسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بلجيكا" data-id="1002043">بلجيكا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بلغاريا" data-id="1002044">بلغاريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بليز" data-id="1002142">بليز</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بنغلاديش" data-id="1002213">بنغلاديش</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بنين" data-id="1002082">بنين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بوتسوانا" data-id="1002083">بوتسوانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورما" data-id="1002251">بورما</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البوسنة والهرسك" data-id="1002036">البوسنة والهرسك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بوليفيا" data-id="1002173">بوليفيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مملكة بوتان" data-id="1002214">مملكة بوتان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="باراجواي" data-id="1002181">باراجواي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="باكستان" data-id="1002222">باكستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بالاو" data-id="1002203">بالاو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بنما" data-id="1002159">بنما</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البرتغال" data-id="1002072">البرتغال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بيرو" data-id="1002182">بيرو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بولينيزيا الفرنسية" data-id="1002190">بولينيزيا الفرنسية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بورتوريكو" data-id="1002160">بورتوريكو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="طاجيكستان" data-id="1002232">طاجيكستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تنزانيا" data-id="1002129">تنزانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تايلاند" data-id="1002264">تايلاند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تايوان" data-id="1002263">تايوان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تركمانستان" data-id="1002233">تركمانستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تركيا" data-id="1002247">تركيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ترينيداد وتوباغو" data-id="1002164">ترينيداد وتوباغو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="توغو" data-id="1002130">توغو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تونس" data-id="1002131">تونس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تونغا" data-id="1002209">تونغا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="توفالو" data-id="1002210">توفالو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تيمور الشرقية" data-id="1193762">تيمور الشرقية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جامايكا" data-id="1002155">جامايكا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جبل طارق" data-id="1002053">جبل طارق</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر سليمان" data-id="1002207">جزر سليمان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر فوكلاند (مالفيناس)" data-id="1002177">جزر فوكلاند
   (مالفيناس)</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر فيجي" data-id="1002189">جزر
   فيجي</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر كوك" data-id="1002188">جزر
   كوك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر كايمان" data-id="1002144">جزر كايمان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر مارشال" data-id="1002195">جزر مارشال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر ماريانا الشمالية" data-id="1002202">جزر ماريانا
   الشمالية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر والیس و فوتونا" data-id="1002194">جزر والیس و
   فوتونا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(أمريكا)" data-id="1002166">جزر ویرجین
   (أمريكا)</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(بريطانيا)" data-id="1002143">جزر ویرجین
   (بريطانيا)</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزیره جوادلوب" data-id="1002151">جزیره جوادلوب</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جمهورية أيرلندا" data-id="1002057">جمهورية أيرلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الجمهورية التشيكية" data-id="1002046">الجمهورية التشيكية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جمهورية الدومينيكان" data-id="1002148">جمهورية الدومينيكان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جيبوتي" data-id="1002092">جيبوتي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تشاد" data-id="1002088">تشاد</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الصين" data-id="1002215">الصين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الدنمارك" data-id="1002047">الدنمارك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="دومینیکا" data-id="1002147">دومینیکا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="رواندا" data-id="1002119">رواندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="روسيا" data-id="1002035">روسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="رومانيا" data-id="1002073">رومانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="زامبيا" data-id="1002104">زامبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اليابان" data-id="1002217">اليابان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سان تومي وبرينسيبي" data-id="1002121">سان تومي وبرينسيبي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ساحل العاج" data-id="1167335">ساحل العاج</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سریلانکا" data-id="1002225">سریلانکا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سان بيير وميكلون" data-id="1002170">سان بيير وميكلون</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت كيتس ونيفيس" data-id="1002161">سانت كيتس ونيفيس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت لوسيا" data-id="1002162">سانت لوسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت هيلين" data-id="1002120">سانت هيلين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت فنسنت وجزر غرينادين" data-id="1002163">سانت فنسنت و
   غرينادين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سنغافورة" data-id="1002262">سنغافورة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="السنغال" data-id="1002122">السنغال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="السويد" data-id="1002078">السويد</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سويسرا" data-id="1002079">سويسرا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سوازيلاند" data-id="1002128">سوازيلاند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="السودان" data-id="1002127">السودان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سورينام" data-id="1002183">سورينام</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سوريا" data-id="1002246">سوريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الصومال" data-id="1002125">الصومال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سيراليون" data-id="1002124">سيراليون</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سيشيل" data-id="1002123">سيشيل</li><li
   onclick="select_area_val(this)" class="li-item" data-value="شيلي" data-id="1002175">شيلي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="صربيا" data-id="1167332">صربيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="العراق" data-id="1002237">العراق</li><li
   onclick="select_area_val(this)" class="li-item" data-value="المملكة العربية السعودية" data-id="1002245">المملكة العربية السعودية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="عمان" data-id="1002243">عمان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غانا" data-id="1002099">غانا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فرنسا" data-id="1002051">فرنسا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فنلندا" data-id="1002050">فنلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فيلبيني" data-id="1002261">فيلبيني</li><li
   onclick="select_area_val(this)" class="li-item" data-value="قبرص" data-id="1002235">قبرص</li><li
   onclick="select_area_val(this)" class="li-item" data-value="قيرغيزستان" data-id="1002231">قيرغيزستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كازاخستان" data-id="1002229">كازاخستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="قطر" data-id="1002244">قطر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كوستاريكا" data-id="1002145">كوستاريكا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كاليدونيا الجديدة" data-id="1002198">كاليدونيا الجديدة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كمبوديا" data-id="1002252">كمبوديا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكاميرون" data-id="1002086">الكاميرون</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كندا" data-id="1002168">كندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كوريا الجنوبية" data-id="1002224">كوريا الجنوبية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كرواتيا" data-id="1002045">كرواتيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كولومبيا" data-id="1002184">كولومبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكونغو" data-id="1002090">الكونغو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكونغو، الجمهورية الديمقراطية" data-id="1198851">الكونغو، جمهورية
   الديمقراطية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كينيا" data-id="1002102">كينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="کوبا" data-id="1002146">کوبا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر القمر" data-id="1002089">جزر القمر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكويت" data-id="1002241">الكويت</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الرأس الأخضر" data-id="1002133">الرأس الأخضر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كيريباتي" data-id="1002192">كيريباتي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غامبيا" data-id="1002098">غامبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جورجيا" data-id="1002228">جورجيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جرينلاند" data-id="1002136">جرينلاند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غواتيمالا" data-id="1002152">غواتيمالا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غيانا" data-id="1002179">غيانا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غينيا" data-id="1002100">غينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غينيا الاستوائية" data-id="1002094">غينيا الاستوائية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غينيا بيساو" data-id="1002101">غينيا بيساو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="لاوس" data-id="1002258">لاوس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="لبنان" data-id="1002242">لبنان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ليسوتو" data-id="1002106">ليسوتو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بولندا" data-id="1002071">بولندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ليبيا" data-id="1002108">ليبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مدغشقر" data-id="1002109">مدغشقر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مارتينيك" data-id="1002156">مارتينيك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ماكاو" data-id="1002259">ماكاو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ملاوي" data-id="1002110">ملاوي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مالطا" data-id="1002067">مالطا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ماليزيا" data-id="1002260">ماليزيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تمويل" data-id="1002111">تمويل</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هنغاريا" data-id="1002056">هنغاريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="المغرب" data-id="1002114">المغرب</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مصر" data-id="1002093">مصر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="منغوليا" data-id="1002219">منغوليا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مقدونيا" data-id="1002066">مقدونيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="المكسيك" data-id="1002169">المكسيك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="موريتانيا" data-id="1002112">موريتانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="موريشيوس" data-id="1002134">موريشيوس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="موزمبيق" data-id="1002115">موزمبيق</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ناورو" data-id="1002197">ناورو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيبال" data-id="1002220">نيبال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="النرويج" data-id="1002070">النرويج</li><li
   onclick="select_area_val(this)" class="li-item" data-value="النيجر" data-id="1002117">النيجر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيجيريا" data-id="1002118">نيجيريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيكاراغوا" data-id="1002158">نيكاراغوا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيوزيلندا" data-id="1002199">نيوزيلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هايتي" data-id="1002153">هايتي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هولندا" data-id="1002069">هولندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الهند" data-id="1002216">الهند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هندوراس" data-id="1002154">هندوراس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هونج كونج" data-id="1002255">هونج كونج</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فانواتو" data-id="1002193">فانواتو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فنزويلا" data-id="1002185">فنزويلا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فيتنام" data-id="1002257">فيتنام</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اليمن" data-id="1002240">اليمن</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اليونان" data-id="1002054">اليونان</li>
</ul></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);

                } else if (element_child_title == 'کشور محل تولد') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item has-select-input`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    var input_name = "";
                    var string = `<div class="inner-item"><input value="ایران"  data-value="ایران" oninput="autoComplete_search(event,this,'area')" onblur="autoFill_search(event,this,'package-info-item')" onkeyup="tab_key(event,this);" onclick="toggle_area(this)"  `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'name') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                        if (schema[i].form[j].attrs[y].attr.name == 'name') {
                            input_name = schema[i].form[j].attrs[y].attr.value;
                        }
                    };
                    string += `/></div><input type="hidden" value="1002236" name="${input_name}" class="area-id"/><ul class="drop-item wide">
                           <li onclick="select_area_val(this)" class="li-item" data-value="ایران" data-id="1002236">ایران</li>
<li onclick="select_area_val(this)" class="li-item" data-value="أذربيجان" data-id="1002227">أذربيجان</li>
<li onclick="select_area_val(this)" class="li-item" data-value="الأرجنتين" data-id="1002172">الأرجنتين</li>
<li onclick="select_area_val(this)" class="li-item" data-value="آروبا" data-id="1002139">آروبا</li>
<li onclick="select_area_val(this)" class="li-item" data-value="جنوب أفريقيا" data-id="1002126">جنوب أفريقيا</li>
<li onclick="select_area_val(this)" class="li-item" data-value="أفريقيا الوسطى" data-id="1002087">أفريقيا الوسطى</li>
<li
   onclick="select_area_val(this)" class="li-item" data-value="ألبانيا"
   data-id="1002040">ألبانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="ألمانيا"
   data-id="1002052">ألمانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="أنتيغوا وبربودا"
   data-id="1002138">أنتيغوا وبربودا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أندورا" data-id="1002041">أندورا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أنغولا" data-id="1002081">أنغولا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أنغيلا" data-id="1002137">أنغيلا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اتریش" data-id="1002042">اتریش</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أثيوبيا" data-id="1002096">أثيوبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الأردن" data-id="1002239">الأردن</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أرمينيا" data-id="1002226">أرمينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوروغواي" data-id="1002180">أوروغواي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="إريتريا" data-id="1002095">إريتريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوزبكستان" data-id="1002230">أوزبكستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="إسبانيا" data-id="1002077">إسبانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أستراليا" data-id="1002187">أستراليا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="إستونيا" data-id="1002048">إستونيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سلوفاكيا" data-id="1002075">سلوفاكيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سلوفينيا" data-id="1002076">سلوفينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أفغانستان" data-id="1002212">أفغانستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الاكوادور" data-id="1002176">الاكوادور</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الجزائر" data-id="1002080">الجزائر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سلفادور" data-id="1002149">سلفادور</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الإمارات العربية المتحدة" data-id="1002248">الإمارات العربية المتحدة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أندونيسيا" data-id="1002256">أندونيسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="انجلترا" data-id="1167330">انجلترا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوكرانيا" data-id="1002039">أوكرانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوغندا" data-id="1002132">أوغندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ولايات ميكرونيزيا الموحدة" data-id="1002196">ولايات ميكرونيزيا الموحدة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ایالات متحده" data-id="1002211">ایالات متحده</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الولايات المتحدة الجزر الهامشية" data-id="1198858">الولايات المتحدة الجزر الهامشية</li><li onclick="select_area_val(this)" class="li-item" data-value="ایتالیا" data-id="1002059">ایتالیا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أيسلندا" data-id="1002034">أيسلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بربادوس" data-id="1002141">بربادوس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر البهاما" data-id="1002140">جزر البهاما</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البحرين" data-id="1002234">البحرين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البرازيل" data-id="1002174">البرازيل</li><li
   onclick="select_area_val(this)" class="li-item" data-value="برمودا" data-id="1002167">برمودا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بروناي" data-id="1002250">بروناي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بيلاروسيا" data-id="1002037">بيلاروسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بلجيكا" data-id="1002043">بلجيكا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بلغاريا" data-id="1002044">بلغاريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بليز" data-id="1002142">بليز</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بنغلاديش" data-id="1002213">بنغلاديش</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بنين" data-id="1002082">بنين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بوتسوانا" data-id="1002083">بوتسوانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورما" data-id="1002251">بورما</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البوسنة والهرسك" data-id="1002036">البوسنة والهرسك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بوليفيا" data-id="1002173">بوليفيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مملكة بوتان" data-id="1002214">مملكة بوتان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="باراجواي" data-id="1002181">باراجواي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="باكستان" data-id="1002222">باكستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بالاو" data-id="1002203">بالاو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بنما" data-id="1002159">بنما</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البرتغال" data-id="1002072">البرتغال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بيرو" data-id="1002182">بيرو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بولينيزيا الفرنسية" data-id="1002190">بولينيزيا الفرنسية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بورتوريكو" data-id="1002160">بورتوريكو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="طاجيكستان" data-id="1002232">طاجيكستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تنزانيا" data-id="1002129">تنزانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تايلاند" data-id="1002264">تايلاند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تايوان" data-id="1002263">تايوان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تركمانستان" data-id="1002233">تركمانستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تركيا" data-id="1002247">تركيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ترينيداد وتوباغو" data-id="1002164">ترينيداد وتوباغو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="توغو" data-id="1002130">توغو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تونس" data-id="1002131">تونس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تونغا" data-id="1002209">تونغا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="توفالو" data-id="1002210">توفالو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تيمور الشرقية" data-id="1193762">تيمور الشرقية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جامايكا" data-id="1002155">جامايكا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جبل طارق" data-id="1002053">جبل طارق</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر سليمان" data-id="1002207">جزر سليمان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر فوكلاند (مالفيناس)" data-id="1002177">جزر فوكلاند (مالفيناس)</li><li 
   onclick="select_area_val(this)" class="li-item" data-value="جزر فيجي" data-id="1002189">جزر
   فيجي</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر كوك" data-id="1002188">جزر
   كوك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر كايمان" data-id="1002144">جزر كايمان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر مارشال" data-id="1002195">جزر مارشال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر ماريانا الشمالية" data-id="1002202">جزر ماريانا الشمالية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر والیس و فوتونا" data-id="1002194">جزر والیس و
   فوتونا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(أمريكا)" data-id="1002166">جزر ویرجین
   (أمريكا)</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(بريطانيا)" data-id="1002143">جزر ویرجین
   (بريطانيا)</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزیره جوادلوب" data-id="1002151">جزیره جوادلوب</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جمهورية أيرلندا" data-id="1002057">جمهورية أيرلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الجمهورية التشيكية" data-id="1002046">الجمهورية التشيكية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جمهورية الدومينيكان" data-id="1002148">جمهورية الدومينيكان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جيبوتي" data-id="1002092">جيبوتي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تشاد" data-id="1002088">تشاد</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الصين" data-id="1002215">الصين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الدنمارك" data-id="1002047">الدنمارك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="دومینیکا" data-id="1002147">دومینیکا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="رواندا" data-id="1002119">رواندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="روسيا" data-id="1002035">روسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="رومانيا" data-id="1002073">رومانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="زامبيا" data-id="1002104">زامبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اليابان" data-id="1002217">اليابان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سان تومي وبرينسيبي" data-id="1002121">سان تومي وبرينسيبي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ساحل العاج" data-id="1167335">ساحل العاج</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سریلانکا" data-id="1002225">سریلانکا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سان بيير وميكلون" data-id="1002170">سان بيير وميكلون</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت كيتس ونيفيس" data-id="1002161">سانت كيتس ونيفيس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت لوسيا" data-id="1002162">سانت لوسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت هيلين" data-id="1002120">سانت هيلين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت فنسنت وجزر غرينادين" data-id="1002163">سانت فنسنت و
   غرينادين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سنغافورة" data-id="1002262">سنغافورة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="السنغال" data-id="1002122">السنغال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="السويد" data-id="1002078">السويد</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سويسرا" data-id="1002079">سويسرا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سوازيلاند" data-id="1002128">سوازيلاند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="السودان" data-id="1002127">السودان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سورينام" data-id="1002183">سورينام</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سوريا" data-id="1002246">سوريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الصومال" data-id="1002125">الصومال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سيراليون" data-id="1002124">سيراليون</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سيشيل" data-id="1002123">سيشيل</li><li
   onclick="select_area_val(this)" class="li-item" data-value="شيلي" data-id="1002175">شيلي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="صربيا" data-id="1167332">صربيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="العراق" data-id="1002237">العراق</li><li
   onclick="select_area_val(this)" class="li-item" data-value="المملكة العربية السعودية" data-id="1002245">المملكة العربية السعودية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="عمان" data-id="1002243">عمان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غانا" data-id="1002099">غانا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فرنسا" data-id="1002051">فرنسا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فنلندا" data-id="1002050">فنلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فيلبيني" data-id="1002261">فيلبيني</li><li
   onclick="select_area_val(this)" class="li-item" data-value="قبرص" data-id="1002235">قبرص</li><li
   onclick="select_area_val(this)" class="li-item" data-value="قيرغيزستان" data-id="1002231">قيرغيزستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كازاخستان" data-id="1002229">كازاخستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="قطر" data-id="1002244">قطر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كوستاريكا" data-id="1002145">كوستاريكا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كاليدونيا الجديدة" data-id="1002198">كاليدونيا الجديدة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كمبوديا" data-id="1002252">كمبوديا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكاميرون" data-id="1002086">الكاميرون</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كندا" data-id="1002168">كندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كوريا الجنوبية" data-id="1002224">كوريا الجنوبية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كرواتيا" data-id="1002045">كرواتيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كولومبيا" data-id="1002184">كولومبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكونغو" data-id="1002090">الكونغو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكونغو، الجمهورية الديمقراطية" data-id="1198851">الكونغو، جمهورية
   الديمقراطية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كينيا" data-id="1002102">كينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="کوبا" data-id="1002146">کوبا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر القمر" data-id="1002089">جزر القمر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكويت" data-id="1002241">الكويت</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الرأس الأخضر" data-id="1002133">الرأس الأخضر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كيريباتي" data-id="1002192">كيريباتي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غامبيا" data-id="1002098">غامبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جورجيا" data-id="1002228">جورجيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جرينلاند" data-id="1002136">جرينلاند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غواتيمالا" data-id="1002152">غواتيمالا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غيانا" data-id="1002179">غيانا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غينيا" data-id="1002100">غينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غينيا الاستوائية" data-id="1002094">غينيا الاستوائية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غينيا بيساو" data-id="1002101">غينيا بيساو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="لاوس" data-id="1002258">لاوس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="لبنان" data-id="1002242">لبنان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ليسوتو" data-id="1002106">ليسوتو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بولندا" data-id="1002071">بولندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ليبيا" data-id="1002108">ليبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مدغشقر" data-id="1002109">مدغشقر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مارتينيك" data-id="1002156">مارتينيك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ماكاو" data-id="1002259">ماكاو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ملاوي" data-id="1002110">ملاوي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مالطا" data-id="1002067">مالطا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ماليزيا" data-id="1002260">ماليزيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تمويل" data-id="1002111">تمويل</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هنغاريا" data-id="1002056">هنغاريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="المغرب" data-id="1002114">المغرب</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مصر" data-id="1002093">مصر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="منغوليا" data-id="1002219">منغوليا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مقدونيا" data-id="1002066">مقدونيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="المكسيك" data-id="1002169">المكسيك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="موريتانيا" data-id="1002112">موريتانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="موريشيوس" data-id="1002134">موريشيوس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="موزمبيق" data-id="1002115">موزمبيق</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ناورو" data-id="1002197">ناورو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيبال" data-id="1002220">نيبال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="النرويج" data-id="1002070">النرويج</li><li
   onclick="select_area_val(this)" class="li-item" data-value="النيجر" data-id="1002117">النيجر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيجيريا" data-id="1002118">نيجيريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيكاراغوا" data-id="1002158">نيكاراغوا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيوزيلندا" data-id="1002199">نيوزيلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هايتي" data-id="1002153">هايتي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هولندا" data-id="1002069">هولندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الهند" data-id="1002216">الهند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هندوراس" data-id="1002154">هندوراس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هونج كونج" data-id="1002255">هونج كونج</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فانواتو" data-id="1002193">فانواتو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فنزويلا" data-id="1002185">فنزويلا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فيتنام" data-id="1002257">فيتنام</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اليمن" data-id="1002240">اليمن</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اليونان" data-id="1002054">اليونان</li>
</ul></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);

                } else if (element_child_title == 'بلد إصدار جواز السفر') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item has-select-input unvisible ${internal}`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    var input_name = "";
                    var string = `<div class="inner-item"><input value="ایران"  data-value="ایران" oninput="autoComplete_search(event,this,'area')" onblur="autoFill_search(event,this,'package-info-item')" onkeyup="tab_key(event,this)" onclick="toggle_area(this)" `;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr.name !== 'name') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                        if (schema[i].form[j].attrs[y].attr.name == 'name') {
                            input_name = schema[i].form[j].attrs[y].attr.value;
                        }
                    };
                    string += `/></div><input type="hidden" value="1002236" name="${input_name}" class="area-id passportissuecountry"/><ul class="drop-item wide">
                           <li onclick="select_area_val(this)" class="li-item" data-value="ایران" data-id="1002236">ایران</li>
<li onclick="select_area_val(this)" class="li-item" data-value="أذربيجان" data-id="1002227">أذربيجان</li>
<li onclick="select_area_val(this)" class="li-item" data-value="الأرجنتين" data-id="1002172">الأرجنتين</li>
<li onclick="select_area_val(this)" class="li-item" data-value="آروبا" data-id="1002139">آروبا</li>
<li onclick="select_area_val(this)" class="li-item" data-value="جنوب أفريقيا" data-id="1002126">جنوب أفريقيا</li>
<li onclick="select_area_val(this)" class="li-item" data-value="أفريقيا الوسطى" data-id="1002087">أفريقيا الوسطى</li>
<li
   onclick="select_area_val(this)" class="li-item" data-value="ألبانيا"
   data-id="1002040">ألبانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="ألمانيا"
   data-id="1002052">ألمانيا</li><li onclick="select_area_val(this)" class="li-item" data-value="أنتيغوا وبربودا"
   data-id="1002138">أنتيغوا وبربودا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أندورا" data-id="1002041">أندورا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أنغولا" data-id="1002081">أنغولا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أنغيلا" data-id="1002137">أنغيلا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اتریش" data-id="1002042">اتریش</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أثيوبيا" data-id="1002096">أثيوبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الأردن" data-id="1002239">الأردن</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أرمينيا" data-id="1002226">أرمينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوروغواي" data-id="1002180">أوروغواي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="إريتريا" data-id="1002095">إريتريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوزبكستان" data-id="1002230">أوزبكستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="إسبانيا" data-id="1002077">إسبانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أستراليا" data-id="1002187">أستراليا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="إستونيا" data-id="1002048">إستونيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سلوفاكيا" data-id="1002075">سلوفاكيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سلوفينيا" data-id="1002076">سلوفينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أفغانستان" data-id="1002212">أفغانستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الاكوادور" data-id="1002176">الاكوادور</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الجزائر" data-id="1002080">الجزائر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سلفادور" data-id="1002149">سلفادور</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الإمارات العربية المتحدة" data-id="1002248">الإمارات العربية المتحدة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أندونيسيا" data-id="1002256">أندونيسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="انجلترا" data-id="1167330">انجلترا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوكرانيا" data-id="1002039">أوكرانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أوغندا" data-id="1002132">أوغندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ولايات ميكرونيزيا الموحدة" data-id="1002196">ولايات ميكرونيزيا الموحدة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ایالات متحده" data-id="1002211">ایالات متحده</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الولايات المتحدة الجزر الهامشية" data-id="1198858">الولايات المتحدة الجزر الهامشية</li><li onclick="select_area_val(this)" class="li-item" data-value="ایتالیا" data-id="1002059">ایتالیا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="أيسلندا" data-id="1002034">أيسلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بربادوس" data-id="1002141">بربادوس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر البهاما" data-id="1002140">جزر البهاما</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البحرين" data-id="1002234">البحرين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البرازيل" data-id="1002174">البرازيل</li><li
   onclick="select_area_val(this)" class="li-item" data-value="برمودا" data-id="1002167">برمودا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بروناي" data-id="1002250">بروناي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بيلاروسيا" data-id="1002037">بيلاروسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بلجيكا" data-id="1002043">بلجيكا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بلغاريا" data-id="1002044">بلغاريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بليز" data-id="1002142">بليز</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بنغلاديش" data-id="1002213">بنغلاديش</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بنين" data-id="1002082">بنين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بوتسوانا" data-id="1002083">بوتسوانا</li><li
       onclick="select_area_val(this)" class="li-item" data-value="بورما" data-id="1002251">بورما</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البوسنة والهرسك" data-id="1002036">البوسنة والهرسك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بوليفيا" data-id="1002173">بوليفيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مملكة بوتان" data-id="1002214">مملكة بوتان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="باراجواي" data-id="1002181">باراجواي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="باكستان" data-id="1002222">باكستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بالاو" data-id="1002203">بالاو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بنما" data-id="1002159">بنما</li><li
   onclick="select_area_val(this)" class="li-item" data-value="البرتغال" data-id="1002072">البرتغال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بيرو" data-id="1002182">بيرو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بولينيزيا الفرنسية" data-id="1002190">بولينيزيا الفرنسية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بورتوريكو" data-id="1002160">بورتوريكو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="طاجيكستان" data-id="1002232">طاجيكستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تنزانيا" data-id="1002129">تنزانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تايلاند" data-id="1002264">تايلاند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تايوان" data-id="1002263">تايوان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تركمانستان" data-id="1002233">تركمانستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تركيا" data-id="1002247">تركيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ترينيداد وتوباغو" data-id="1002164">ترينيداد وتوباغو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="توغو" data-id="1002130">توغو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تونس" data-id="1002131">تونس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تونغا" data-id="1002209">تونغا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="توفالو" data-id="1002210">توفالو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تيمور الشرقية" data-id="1193762">تيمور الشرقية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جامايكا" data-id="1002155">جامايكا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جبل طارق" data-id="1002053">جبل طارق</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر سليمان" data-id="1002207">جزر سليمان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر فوكلاند (مالفيناس)" data-id="1002177">جزر فوكلاند
   (مالفيناس)</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر فيجي" data-id="1002189">جزر
   فيجي</li><li onclick="select_area_val(this)" class="li-item" data-value="جزر كوك" data-id="1002188">جزر
   كوك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر كايمان" data-id="1002144">جزر كايمان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر مارشال" data-id="1002195">جزر مارشال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر ماريانا الشمالية" data-id="1002202">جزر ماريانا
   الشمالية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر والیس و فوتونا" data-id="1002194">جزر والیس و
   فوتونا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(أمريكا)" data-id="1002166">جزر ویرجین
   (أمريكا)</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر ویرجین(بريطانيا)" data-id="1002143">جزر ویرجین
   (بريطانيا)</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزیره جوادلوب" data-id="1002151">جزیره جوادلوب</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جمهورية أيرلندا" data-id="1002057">جمهورية أيرلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الجمهورية التشيكية" data-id="1002046">الجمهورية التشيكية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جمهورية الدومينيكان" data-id="1002148">جمهورية الدومينيكان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جيبوتي" data-id="1002092">جيبوتي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تشاد" data-id="1002088">تشاد</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الصين" data-id="1002215">الصين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الدنمارك" data-id="1002047">الدنمارك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="دومینیکا" data-id="1002147">دومینیکا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="رواندا" data-id="1002119">رواندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="روسيا" data-id="1002035">روسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="رومانيا" data-id="1002073">رومانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="زامبيا" data-id="1002104">زامبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اليابان" data-id="1002217">اليابان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سان تومي وبرينسيبي" data-id="1002121">سان تومي وبرينسيبي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ساحل العاج" data-id="1167335">ساحل العاج</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سریلانکا" data-id="1002225">سریلانکا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سان بيير وميكلون" data-id="1002170">سان بيير وميكلون</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت كيتس ونيفيس" data-id="1002161">سانت كيتس ونيفيس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت لوسيا" data-id="1002162">سانت لوسيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت هيلين" data-id="1002120">سانت هيلين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سانت فنسنت وجزر غرينادين" data-id="1002163">سانت فنسنت و
   غرينادين</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سنغافورة" data-id="1002262">سنغافورة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="السنغال" data-id="1002122">السنغال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="السويد" data-id="1002078">السويد</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سويسرا" data-id="1002079">سويسرا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سوازيلاند" data-id="1002128">سوازيلاند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="السودان" data-id="1002127">السودان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سورينام" data-id="1002183">سورينام</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سوريا" data-id="1002246">سوريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الصومال" data-id="1002125">الصومال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سيراليون" data-id="1002124">سيراليون</li><li
   onclick="select_area_val(this)" class="li-item" data-value="سيشيل" data-id="1002123">سيشيل</li><li
   onclick="select_area_val(this)" class="li-item" data-value="شيلي" data-id="1002175">شيلي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="صربيا" data-id="1167332">صربيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="العراق" data-id="1002237">العراق</li><li
   onclick="select_area_val(this)" class="li-item" data-value="المملكة العربية السعودية" data-id="1002245">المملكة العربية السعودية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="عمان" data-id="1002243">عمان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غانا" data-id="1002099">غانا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فرنسا" data-id="1002051">فرنسا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فنلندا" data-id="1002050">فنلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فيلبيني" data-id="1002261">فيلبيني</li><li
   onclick="select_area_val(this)" class="li-item" data-value="قبرص" data-id="1002235">قبرص</li><li
   onclick="select_area_val(this)" class="li-item" data-value="قيرغيزستان" data-id="1002231">قيرغيزستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كازاخستان" data-id="1002229">كازاخستان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="قطر" data-id="1002244">قطر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كوستاريكا" data-id="1002145">كوستاريكا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كاليدونيا الجديدة" data-id="1002198">كاليدونيا الجديدة</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كمبوديا" data-id="1002252">كمبوديا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكاميرون" data-id="1002086">الكاميرون</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كندا" data-id="1002168">كندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كوريا الجنوبية" data-id="1002224">كوريا الجنوبية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كرواتيا" data-id="1002045">كرواتيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كولومبيا" data-id="1002184">كولومبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكونغو" data-id="1002090">الكونغو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكونغو، الجمهورية الديمقراطية" data-id="1198851">الكونغو، جمهورية
   الديمقراطية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كينيا" data-id="1002102">كينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="کوبا" data-id="1002146">کوبا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جزر القمر" data-id="1002089">جزر القمر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الكويت" data-id="1002241">الكويت</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الرأس الأخضر" data-id="1002133">الرأس الأخضر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="كيريباتي" data-id="1002192">كيريباتي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غامبيا" data-id="1002098">غامبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جورجيا" data-id="1002228">جورجيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="جرينلاند" data-id="1002136">جرينلاند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غواتيمالا" data-id="1002152">غواتيمالا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غيانا" data-id="1002179">غيانا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غينيا" data-id="1002100">غينيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غينيا الاستوائية" data-id="1002094">غينيا الاستوائية</li><li
   onclick="select_area_val(this)" class="li-item" data-value="غينيا بيساو" data-id="1002101">غينيا بيساو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="لاوس" data-id="1002258">لاوس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="لبنان" data-id="1002242">لبنان</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ليسوتو" data-id="1002106">ليسوتو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="بولندا" data-id="1002071">بولندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ليبيا" data-id="1002108">ليبيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مدغشقر" data-id="1002109">مدغشقر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مارتينيك" data-id="1002156">مارتينيك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ماكاو" data-id="1002259">ماكاو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ملاوي" data-id="1002110">ملاوي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مالطا" data-id="1002067">مالطا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ماليزيا" data-id="1002260">ماليزيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="تمويل" data-id="1002111">تمويل</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هنغاريا" data-id="1002056">هنغاريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="المغرب" data-id="1002114">المغرب</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مصر" data-id="1002093">مصر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="منغوليا" data-id="1002219">منغوليا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="مقدونيا" data-id="1002066">مقدونيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="المكسيك" data-id="1002169">المكسيك</li><li
   onclick="select_area_val(this)" class="li-item" data-value="موريتانيا" data-id="1002112">موريتانيا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="موريشيوس" data-id="1002134">موريشيوس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="موزمبيق" data-id="1002115">موزمبيق</li><li
   onclick="select_area_val(this)" class="li-item" data-value="ناورو" data-id="1002197">ناورو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيبال" data-id="1002220">نيبال</li><li
   onclick="select_area_val(this)" class="li-item" data-value="النرويج" data-id="1002070">النرويج</li><li
   onclick="select_area_val(this)" class="li-item" data-value="النيجر" data-id="1002117">النيجر</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيجيريا" data-id="1002118">نيجيريا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيكاراغوا" data-id="1002158">نيكاراغوا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="نيوزيلندا" data-id="1002199">نيوزيلندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هايتي" data-id="1002153">هايتي</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هولندا" data-id="1002069">هولندا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="الهند" data-id="1002216">الهند</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هندوراس" data-id="1002154">هندوراس</li><li
   onclick="select_area_val(this)" class="li-item" data-value="هونج كونج" data-id="1002255">هونج كونج</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فانواتو" data-id="1002193">فانواتو</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فنزويلا" data-id="1002185">فنزويلا</li><li
   onclick="select_area_val(this)" class="li-item" data-value="فيتنام" data-id="1002257">فيتنام</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اليمن" data-id="1002240">اليمن</li><li
   onclick="select_area_val(this)" class="li-item" data-value="اليونان" data-id="1002054">اليونان</li>
</ul></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);


                } else if (element_child_title == 'رقم جواز السفر') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item ${internal}`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    element_child.setAttribute("onkeydown", "persian_key(event,this)");
                    var string = `<div class="inner-item"><input onkeyup="this.value=this.value.replace(/[^0-9a-zA-Z]/g, '');" class="passportcode${internal == 'internal' ? '' : ' necessary'}"`;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr
                                .name !== 'class') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);

                } else if (element_child_title == 'رقم الهویة الوطنية') {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item unvisible`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    label.setAttribute("data-label", element_child_title);
                    element_child.appendChild(label);
                    var string = `<div class="inner-item"><input value="-" `;
                    string +=
                        `onkeyup="this.value=this.value.replace(/[^0-9]/g, '');" onkeydown="persian_key(event,this)"`;
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder' && schema[i].form[j].attrs[y].attr
                                .name !== 'class') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);
                } else {
                    var element_child = document.createElement("div");
                    element_child.className = `package-info-item`;
                    var label = document.createElement("label");
                    label.innerHTML = element_child_title;
                    element_child.appendChild(label);
                    var string = `<div class="inner-item"><input `;
                    console.log("ok3")
                    if (element_child_title == 'الاسم الأول باللغة الإنجليزية') {
                        label.setAttribute("data-label", "الاسم");
                        string += `onkeydown="english_key(event,this)" onkeyup="upperCase_key(event,this)"`;
                    }
                    if (element_child_title == 'اللقب باللغة الإنجليزية') {
                        label.setAttribute("data-label", "اللقب");
                        string += `onkeydown="english_key(event,this)" onkeyup="upperCase_key(event,this)"`;
                    }
                    if (element_child_title == 'الاسم الأب') {
                        label.setAttribute("data-label", element_child_title);
                        string += `onkeydown="english_key(event,this)" onkeyup="upperCase_key(event,this)"`;
                    }
                    for (var y = 0; y < schema[i].form[j].attrs.length; y++) {
                        if (schema[i].form[j].attrs[y].attr.name !== 'id' && schema[i].form[j].attrs[y].attr
                            .name !== 'placeholder') {
                            string += schema[i].form[j].attrs[y].attr.name + '="' + schema[i].form[j].attrs[
                                y].attr.value + '" ';
                        }
                    };
                    string += `/></div>`;
                    element_child.innerHTML += string;
                    element_children.appendChild(element_child);
                }

            }
        };
        var element_child = document.createElement("div");
        element_child.className = "package-info-item box-doc-infoes";
        var label = document.createElement("label");
        label.innerHTML =
            "تحميل المستندات : <span class='label-notification'>يجب أن تكون المستندات التي تم تحميلها بامتداد jpeg أو jpg أو pdf والحد الأقصى للحجم المسموح للتحميل هو 100 كيلو بايت.</span>";
        element_child.appendChild(label);

        var string = "<p class='img-error'></p><ul> ";
        for (var k = 0; k < $(".documents-container p").length; k++) {
            var docId = $('.documents-container').children(`p:nth-child(${k + 1})`).find(".docId")
                .val()
            var name1 = $('.documents-container').children(`p:nth-child(${k + 1})`).find(".name1")
                .val()
            string +=
                `<li><div class='inner-content'><p><i class='fas fa-upload'></i></p> <form  method='POST' onsubmit='upload_form(event,this)' class='upload-form' data-version="${document.querySelector(".upload-info").getAttribute("data-version")}" action=""
                       enctype='multipart/form-data'><input type='hidden' value="${k}" class='index-doc' name='index-doc' /><input type='hidden' value='${i}' class='index-passenger' name='index-passenger'/><input type='hidden' class='docId' value="${docId}" name='docId'/><input type='hidden' class='formid' value='${formid_value}' name='formid'/><input type='hidden' class='permitid' value='${permitid_value}' name='permitid'/><input type='hidden' value='' class='upload-userid' name='userid'/><input type='file' id='file' name='file' accept='image/jpg, image/jpeg'  onchange='loadFile(this)' multiple/><div class='output-content'><img id='output' width='100' height='100'/></div></form><p class="font_13">${name1}</p></div><div class='result-upload'></div></li>`
        }
        string += '</ul>';
        element_child.innerHTML += string;
        element_children.appendChild(element_child);
        var element_clr = document.createElement("div");
        element_clr.className = "clr";
        element_children.appendChild(element_clr);
        element.appendChild(element_children);
        document.querySelector(".passengers-info-content").appendChild(element);
    };
    if (todo == 'default') {
        create_array_data('no-room');
    };


};
//<!-----------UPLOAD DOCUMENT--------------->//
//<!-----------ADD PASSENGERS TO FORM--------------->//
function add_visa_passenger(element) {
    if (document.querySelector(".main-userid").value == 0) {
        // updated login 
        showLoginContainer();
    } else {
        create_passengers_form('add', document.getElementById('permitid-value').value, document.getElementById('formid-value').value);
        for (var i = 0; i < $(element).closest('.passengers-info-content').find(".passenger-info-content").length; i++) {
            $(element).closest('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find(".prev-passengers").attr("data-index", i);
            $(element).closest('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 2})`).find(
                '.add-passengers').attr('onclick', 'remove_visa_passenger(this)');
            $(element).closest('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 2})`).find(
                '.add-passengers').html('<i class="fa fa-minus"></i>إزالة الركاب');
            $(element).closest('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 2})`).find(
                '.add-passengers').removeClass('add-passengers').addClass('remove-passengers');
            if ($(element).closest('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 2})`).find(
                '.is-escort').val() == undefined) {
                $(element).closest('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 2})`).append(
                    '<input type="hidden" class="is-escort" value="1" name="_root.passengerinfo__0.passengerinfo.escort"/>'
                );
            };
            $(element).closest('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).attr("data-index", i);
            $(element).closest('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find(".index-passenger").val(i);
        };
        set_names_visa_passengers();
        for (var i = 0; i < document.getElementsByClassName("firstpay-price").length; i++) {
            document.getElementsByClassName("firstpay-price")[i].innerText = new Intl.NumberFormat().format(parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) + parseFloat($(".escortcost-adult").find(".escortcost").val()));
        };
        document.querySelector(".firstpay-section").setAttribute("data-output", parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) + parseFloat($(".escortcost-adult").find(".escortcost").val()));

        if (document.querySelector(".totalcom-section").querySelector(".totalcom-price")) {
            document.querySelector(".totalcom-section").querySelector(".totalcom-price") = new Intl.NumberFormat().format(parseFloat(document.querySelector(".totalcom-section").querySelector(".totalcom-price").innerText.replace(/\,/g, '')) + parseFloat($(".escortcost-adult").find(".escortcost").val()));
        }


    }

}
//<!-----------REMOVE PASSENGERS FROM FORM--------------->//
function remove_visa_passenger(element) {
    $(element).closest(".passenger-info-content").remove();
    set_names_visa_passengers();
    if ($(element).closest(".passenger-info-content").find('.passenger-type').val() == 2) {

        for (var i = 0; i < document.getElementsByClassName("firstpay-price").length; i++) {
            document.getElementsByClassName("firstpay-price")[i].innerText = new Intl.NumberFormat().format(parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) - parseFloat($(".escortcost-adult").find(".escortcost").val()));
        };
        document.querySelector(".firstpay-section").setAttribute("data-output", parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) - parseFloat($(".escortcost-adult").find(".escortcost").val()));

        if (document.querySelector(".totalcom-section").querySelector(".totalcom-price")) {
            document.querySelector(".totalcom-section").querySelector(".totalcom-price") = new Intl.NumberFormat().format(parseFloat(document.querySelector(".totalcom-section").querySelector(".totalcom-price").innerText.replace(/\,/g, '')) - parseFloat($(".escortcost-adult").find(".escortcost").val()));
        }



    } else if ($(element).closest(".passenger-info-content").find('.passenger-type').val() == 1) {



        for (var i = 0; i < document.getElementsByClassName("firstpay-price").length; i++) {
            document.getElementsByClassName("firstpay-price")[i].innerText = new Intl.NumberFormat().format(parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) - parseFloat($(".escortcost-child").find(".escortcost").val()));
        };
        document.querySelector(".firstpay-section").setAttribute("data-output", parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) - parseFloat($(".escortcost-child").find(".escortcost").val()));

        if (document.querySelector(".totalcom-section").querySelector(".totalcom-price")) {
            document.querySelector(".totalcom-section").querySelector(".totalcom-price") = new Intl.NumberFormat().format(parseFloat(document.querySelector(".totalcom-section").querySelector(".totalcom-price").innerText.replace(/\,/g, '')) - parseFloat($(".escortcost-child").find(".escortcost").val()));
        }




    } else if ($(element).closest(".passenger-info-content").find('.passenger-type').val() == 0) {


        for (var i = 0; i < document.getElementsByClassName("firstpay-price").length; i++) {
            document.getElementsByClassName("firstpay-price")[i].innerText = new Intl.NumberFormat().format(parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) - parseFloat($(".escortcost-infant").find(".escortcost").val()));
        };
        document.querySelector(".firstpay-section").setAttribute("data-output", parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, '')) - parseFloat($(".escortcost-infant").find(".escortcost").val()));

        if (document.querySelector(".totalcom-section").querySelector(".totalcom-price")) {
            document.querySelector(".totalcom-section").querySelector(".totalcom-price") = new Intl.NumberFormat().format(parseFloat(document.querySelector(".totalcom-section").querySelector(".totalcom-price").innerText.replace(/\,/g, '')) - parseFloat($(".escortcost-infant").find(".escortcost").val()));
        }


    }
}
//<!-----------UPDATE THE NAME OF INPUTS OF PASSENGERS FORM--------------->//
function set_names_visa_passengers() {
    for (var i = 0; i < $('.passengers-info-content').find(".passenger-info-content").length; i++) {
        $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find(".package-info-item").each(
            function () {
                $(this).find("input").each(function () {


                    if ($(this).attr('name')) {
                        var split_name = $(this).attr('name').split('.')

                        $(this).attr('name', $(this).attr('name').replace(split_name[1], `passengerinfo__${i}`))

                    }
                })

            })
        if ($('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find('.is-escort').attr(
            'name') != undefined) {
            var split_name_escort = $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`)
                .find('.is-escort').attr('name').split('.')
            $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find('.is-escort').attr(
                'name', $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find(
                    '.is-escort').attr('name').replace(split_name_escort[1],
                        `passengerinfo__${i}`))
        }
        var split_name_type = $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find(
            '.passenger-type').attr('name').split('.')
        $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find('.passenger-type').attr('name',
            $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find('.passenger-type').attr(
                'name').replace(split_name_type[1], `passengerinfo__${i}`))
        if ($('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find('.passenger-type').val() ==
            2) {
            $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find('.passenger-title')
                .text(`بالغ ${i + 1}`)
        } else if ($('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find('.passenger-type')
            .val() == 1) {
            $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find('.passenger-title')
                .text(`طفل ${i + 1}`)
        } else {
            $('.passengers-info-content').children(`.passenger-info-content:nth-child(${i + 1})`).find('.passenger-title')
                .text(`رضیع ${i + 1}`)
        }
    }
}
//<!-----------CACULATE THE AGE OF PASSENGERS WHEN SELECT THE BIRTHDATE--------------->//
function calculate_age(year, month, day, element) {
    var dateString = year + '/' + month + '/' + day
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    };
    var minus_cost = 0
    var plust_cost = 0
    var child_rule = parseFloat($(".child-rule").val())
    var infant_rule = parseFloat($(".infant-rule").val())
    infant_rule = infant_rule / 12
    var firstpay = parseFloat(document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText.replace(/\,/g, ''));
    if (document.querySelector(".totalcom-section").querySelector(".totalcom-price")) {
        var totalcom = parseFloat(document.querySelector(".totalcom-section").querySelector(".totalcom-price").innerText.replace(/\,/g, ''));
    };
    var index = $(element).closest(".passenger-info-content").index();
    index = index + 1;
    if (age > child_rule) {
        if ($(element).closest(".passenger-info-content").find('.passenger-type').val() == 2) {
            minus_cost = parseFloat($(".escortcost-adult").find(".escortcost").val());
            plust_cost = parseFloat($(".escortcost-adult").find(".escortcost").val());
        } else if ($(element).closest(".passenger-info-content").find('.passenger-type').val() == 1) {
            minus_cost = parseFloat($(".escortcost-child").find(".escortcost").val());
            plust_cost = parseFloat($(".escortcost-adult").find(".escortcost").val());
        } else {
            minus_cost = parseFloat($(".escortcost-infant").find(".escortcost").val());
            plust_cost = parseFloat($(".escortcost-adult").find(".escortcost").val());
        }
        $(element).closest(".passenger-info-content").find('.passenger-title').text('بالغ ' + index);
        $(element).closest(".passenger-info-content").find('.passenger-type').val(2)
    } else if (age <= child_rule && age > infant_rule) {
        if ($(element).closest(".passenger-info-content").find('.passenger-type').val() == 2) {
            minus_cost = parseFloat($(".escortcost-adult").find(".escortcost").val());
            plust_cost = parseFloat($(".escortcost-child").find(".escortcost").val());
        } else if ($(element).closest(".passenger-info-content").find('.passenger-type').val() == 1) {
            minus_cost = parseFloat($(".escortcost-child").find(".escortcost").val());
            plust_cost = parseFloat($(".escortcost-child").find(".escortcost").val());
        } else {
            minus_cost = parseFloat($(".escortcost-infant").find(".escortcost").val());
            plust_cost = parseFloat($(".escortcost-child").find(".escortcost").val());
        }

        $(element).closest(".passenger-info-content").find('.passenger-title').text('طفل ' + index);
        $(element).closest(".passenger-info-content").find('.passenger-type').val(1);
    } else if (age <= infant_rule) {
        if ($(element).closest(".passenger-info-content").find('.passenger-type').val() == 2) {
            minus_cost = parseFloat($(".escortcost-adult").find(".escortcost").val());
            plust_cost = parseFloat($(".escortcost-infant").find(".escortcost").val());
        } else if ($(element).closest(".passenger-info-content").find('.passenger-type').val() == 1) {
            minus_cost = parseFloat($(".escortcost-child").find(".escortcost").val());
            plust_cost = parseFloat($(".escortcost-infant").find(".escortcost").val());
        } else {
            minus_cost = parseFloat($(".escortcost-infant").find(".escortcost").val());
            plust_cost = parseFloat($(".escortcost-infant").find(".escortcost").val());
        }
        $(element).closest(".passenger-info-content").find('.passenger-title').text('رضیع ' + index);
        $(element).closest(".passenger-info-content").find('.passenger-type').val(0);
    }
    document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerHTML = new Intl.NumberFormat().format(firstpay - minus_cost + plust_cost);
    if (document.querySelector(".totalcom-section").querySelector(".totalcom-price")) {
        totalcom = document.querySelector(".totalcom-section").querySelector(".totalcom-price").innerText = new Intl.NumberFormat().format(totalcom - minus_cost + plust_cost);;
    };
}
//<!-----------UPLOAD IMAGES--------------->//
function upload_form(event, element) {
    var form_action = "/Client_Upload_Action.bc";
    event.preventDefault();
    var element = $(element);
    if ($(".main-userid").val() == 0) {
        $(".loginpartner_frm").find(".tab-key").val(1);
        // updated login 
        showLoginContainer();
    } else {
        var rkey = document.querySelector(".upload-info").getAttribute("data-rkey");
        if (rkey == "") {
            rkey = $('input[name="rkeyValue"]').val();
        }
        if (element.attr("data-version") == '4') {
            element.attr("action", `${form_action}?rkey=${rkey}&uploadcookie=customerupload&permitid=${element.find(".permitid").val()}&ip=${document.querySelector(".upload-info").getAttribute("data-ip")}`);
        } else {
            element.attr("action", form_action);
        }
        element.find('.upload-userid').val($(".main-userid").val());
        var form = new FormData();
        form.append('file', element.find('#file')[0].files[0]);
        form.append('docId', element.find('.docId').val());
        form.append('formid', element.find('.formid').val());
        form.append('permitid', element.find('.permitid').val());
        form.append('userid', element.find('.upload-userid').val());
        form.append('index-doc', element.find('.index-doc').val());
        form.append('index-passenger', element.find('.index-passenger').val());
        if (element.find('#file').val() == '') {
            element.closest('.passenger-info-content').find('.img-error').html(
                '<span>choose an image</span>');
        } else {
            $.ajax({
                url: element.attr("action"),
                type: element.attr("method"),
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                success: function (response) {
                    element.closest("li").find(".result-upload").html(response)
                    element.closest("li").find('.inner-content').css('border-color',
                        '#2db742');
                    element.closest('li').find(".fa-upload").css('color', '#2db742');

                }
            });
        }

    }
}
//<!-----------SHOW PREVIEW OF IMAGE THAT IS LOADED--------------->//
function loadFile(element) {
    const file = element.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            $(element).closest("li").find("#output").attr('src', event.target.result);
        }
        reader.readAsDataURL(file);
        $(element).closest('form').submit();
    }
}

//<!----------------END JS VIS---------------->
//<!----------------START JS TRAIN---------------->
function show_train_rule(element) {
    element.closest(".section-item").querySelector(".loading-container").classList.remove("unvisible");
    const obj = new Object();
    obj["id"] = JSON.parse(document.querySelector(".id").value);
    obj["adults"] = document.querySelector(".body-content.adults").querySelector(".count").innerText;
    obj["childs"] = document.querySelector(".body-content.childs").querySelector(".count").innerText;
    obj["infant"] = document.querySelector(".body-content.infants").querySelector(".count").innerText;
    delete obj["total_tax"];
    delete obj["passenger_tax"];
    delete obj["total_without_tax"];
    let obj_stringify = JSON.stringify(obj);
    obj_stringify = obj_stringify.replace(/\\/g, '');
    $.post(`/Client_Train_Rule.bc`, {
        id: obj_stringify
    }, function (response) {
        element.closest(".section-item").querySelector(".loading-container").classList.add("unvisible");
        $(element).closest(".section-item").find(".response").addClass("max-height").html(response);

    });
}
//<!----------------END JS TRAIN---------------->
//<!----------------START JS TOURIST PANEL---------------->
if (document.querySelector(".main-container").getAttribute("data-schemaid") == 501) {
    if (!$(".transfer-info-content")[0]) {
        $(".touristpanel-step").hide();
    } else {
        $(".touristpanel-step").show();
    }
    $(".transfer-info-content").each(function () {
        if ($(this).find(".transfer-Count-orgin").val() > 0) {
            $(this).closest(".transfer-info-content").find(".transfer-Count").show()
        } else {
            $(this).closest(".transfer-info-content").find(".transfer-Count").empty()
        }
    })
    $(".route-id").each(function () {
        if ($(this).val() == 1) {
            $(this).closest(".transfer-info-content").find(".return-field").empty()
            $(this).closest(".transfer-info-content").find(".return-field").hide()

        } else if ($(this).val() == 2) {
            $(this).closest(".transfer-info-content").find(".departure-field").empty()
            $(this).closest(".transfer-info-content").find(".departure-field").hide()
        }
    })
    $(document).ready(function () {
        var share_value = $(".share-value").first().val()
        var supplier_value = $(".supplier-value").first().val()
        $(".share").each(function () {
            $(this).val(share_value)
        })
        $(".supplier").each(function () {
            $(this).val(supplier_value)
        })
    })
    $(document).ready(function () {
        var service_len = $(".service-info-each").length;
        if (service_len > 0) {
            for (var i = 0; i < service_len; i++) {
                $(".service-info-each:nth-child(" + i + ")").find(".set-name").each(function () {
                    $(this).attr("name", $(this).attr("name").replace('products__0', 'products__' + [i]))
                })
                if ($(".service-date-item")) {
                    $(".service-info-each:nth-child(" + i + ")").find(".service-date-item").each(function () {
                        $(this).attr("data-index", i)
                    })
                }
            }
            $(".check-cal-flag").val("true")
            if ($(".check-cal-flag").val() == "true") {
                show_service_date()
            }
        }
    })

    function show_service_date() {
        $(".service-date-item").each(function () {
            var service_date_type = $(this).attr("data-type");
            var service_dep_date = $(this).attr("data-date");
            var index = $(this).attr("data-index");
            service_dep_date_splited = service_dep_date.split("-");
            $(this).append(`<div class="passenger-date-items"><div class="passenger-date-item has-select"><div class="inner-item"><input type="text"  onclick="toggle_date(this,'day')" placeholder="يوم" class="day necessary" oninput="autoComplete_search(event,this,'day')"  onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id="${service_dep_date_splited[2] ? service_dep_date_splited[2] : ''}" value="${service_dep_date_splited[2] ? service_dep_date_splited[2] : ''}" /></div>
           <ul class="drop-item">
            <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="1">1</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="2">2</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="3">3</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="4">4</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="5">5</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="6">6</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="7">7</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="8">8</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="9">9</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="10">10</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="11">11</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="12">12</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="13" data-value="13">13</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="14" data-value="14">14</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="15" data-value="15">15</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="16" data-value="16">16</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="17" data-value="17">17</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="18" data-value="18">18</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="19" data-value="19">19</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="20" data-value="20">20</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="21" data-value="21">21</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="22" data-value="22">22</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="23" data-value="23">23</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="24" data-value="24">24</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="25" data-value="25">25</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="26" data-value="26">26</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="27" data-value="27">27</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="28" data-value="28">28</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="29" data-value="29">29</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="30" data-value="30">30</li>
            <li onclick="select_date_val(this)" class="li-item" data-id="31" data-value="31">31</li>
            </ul></div>
            <div class="passenger-date-item has-select"><div class="inner-item"><input type="text"  onclick="toggle_date(this,'month')"  placeholder="شهر" class="month necessary" oninput="autoComplete_search(event,this,'month')" onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="tab_key(event,this);" data-id="${service_dep_date_splited[1] ? service_dep_date_splited[1] : ''}" value="${service_dep_date_splited[1] ? service_dep_date_splited[1] : ''}"/></div>
            <ul class="drop-item">
           <li onclick="select_date_val(this)" class="li-item" data-id="01" data-value="January">January</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="02" data-value="February">February</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="03" data-value="March">March</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="04" data-value="April">April</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="05" data-value="May">May</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="06" data-value="June">June</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="07" data-value="July">July</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="08" data-value="August">August</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="09" data-value="September">September</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="10" data-value="October">October</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="11" data-value="November">November</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="12" data-value="December">December</li>
           </ul></div>
           <div class="passenger-date-item has-select">
           <div class="inner-item"><input type="text" onclick="toggle_date(this,'year-birthdate')" placeholder="سنة" class="year necessary" oninput="autoComplete_search(event,this,'year-birthdate')" onblur="autoFill_search(event,this,'passenger-date-item')" onkeyup="this.value=this.value.replace(/[^0-9]/g, ''),tab_key(event,this);" data-id="${service_dep_date_splited[0] ? service_dep_date_splited[0] : ''}" value="${service_dep_date_splited[0] ? service_dep_date_splited[0] : ''}"/></div>
           <ul class="drop-item">
           <li onclick="select_date_val(this)" class="li-item" data-id="2024" data-value="2024">2024</li>
           <li onclick="select_date_val(this)" class="li-item" data-id="2023" data-value="2023">2023</li>
          <li onclick="select_date_val(this)" class="li-item" data-id="2022" data-value="2022">2022</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2021" data-value="2021">2021</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2020" data-value="2020">2020</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2019" data-value="2019">2019</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2018" data-value="2018">2018</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2017" data-value="2017">2017</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2016" data-value="2016">2016</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2015" data-value="2015">2015</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2014" data-value="2014">2014</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2013" data-value="2013">2013</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2012" data-value="2012">2012</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2011" data-value="2011">2011</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2010" data-value="2010">2010</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2009" data-value="2009">2009</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2008" data-value="2008">2008</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2007" data-value="2007">2007</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2006" data-value="2006">2006</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2005" data-value="2005">2005</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2004" data-value="2004">2004</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2003" data-value="2003">2003</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2002" data-value="2002">2002</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2001" data-value="2001">2001</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="2000" data-value="2000">2000</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1999" data-value="1999">1999</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1998" data-value="1998">1998</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1997" data-value="1997">1997</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1996" data-value="1996">1996</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1995" data-value="1995">1995</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1994" data-value="1994">1994</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1993" data-value="1993">1993</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1992" data-value="1992">1992</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1991" data-value="1991">1991</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1990" data-value="1990">1990</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1989" data-value="1989">1989</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1988" data-value="1988">1988</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1987" data-value="1987">1987</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1986" data-value="1986">1986</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1985" data-value="1985">1985</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1984" data-value="1984">1984</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1983" data-value="1983">1983</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1982" data-value="1982">1982</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1981" data-value="1981">1981</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1980" data-value="1980">1980</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1979" data-value="1979">1979</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1978" data-value="1978"> 1978</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1977" data-value="1977">1977</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1976" data-value="1976">1976</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1975" data-value="1975">1975</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1974" data-value="1974">1974</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1973" data-value="1973">1973</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1972" data-value="1972"> 1972</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1971" data-value="1971">1971</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1970" data-value="1970">1970</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1969" data-value="1969">1969</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1968" data-value="1968">1968</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1967" data-value="1967">1967</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1966" data-value="1966">1966</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1965" data-value="1965"> 1965</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1964" data-value="1964">1964</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1963" data-value="1963">1963</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1962" data-value="1962">1962</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1961" data-value="1961">1961</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1960" data-value="1960">1960</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1959" data-value="1959">1959</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1958" data-value="1958">1958</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1957" data-value="1957">1957</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1956" data-value="1956">1956</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1955" data-value="1955">1955</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1954" data-value="1954">1954</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1953" data-value="1953">1953</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1952" data-value="1952">1952</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1951" data-value="1951">1951</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1950" data-value="1950">1950</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1949" data-value="1949">1949</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1948" data-value="1948">1948</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1947" data-value="1947">1947</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1946" data-value="1946">1946</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1945" data-value="1945">1945</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1944" data-value="1944">1944</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1943" data-value="1943">1943</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1942" data-value="1942">1942</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1941" data-value="1941">1941</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1940" data-value="1940">1940</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1939" data-value="1939">1939</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1938" data-value="1938">1938</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1937" data-value="1937">1937</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1936" data-value="1936">1936</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1935" data-value="1935">1935</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1934" data-value="1934">1934</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1933" data-value="1933">1933</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1932" data-value="1932">1932</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1931" data-value="1931">1931</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1930" data-value="1930">1930</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1929" data-value="1929">1929</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1928" data-value="1928">1928</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1927" data-value="1927">1927</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1926" data-value="1926"> 1926</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1925" data-value="1925"> 1925</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1924" data-value="1924">1924</li>
       <li onclick="select_date_val(this)" class="li-item" data-id="1923" data-value="1923">1923</li>
       </ul></div><input type="hidden" value="${service_dep_date}" class="datepicker setname" name="_root.products__${index}.${service_date_type}.date" autocomplete="off" readonly="true"></div>`)
            if ($(this).closest(".package-info-item").hasClass('departure-field')) {
                $(this).find("input").each(function () {
                    $(this).prop('readonly', true);
                    $(this).prop("onclick", null).off("click");
                })
            }
        })
    }

    function transfer_count(element) {
        var count = element.value - 1
        if (document.querySelector(".totalcom-section").querySelector(".totalcom-price")) {
            original_price = document.querySelector(".totalcom-section").querySelector(".totalcom-price").getAttribute("data-value").innerText.replace(/\,/g, '');
        } else {
            original_price = document.querySelector(".firstpay-section").querySelector(".firstpay-price").getAttribute("data-value");
        }
        var sellprice = parseFloat(element.closest(".service-info-each").querySelector(".sellprice-cost").value)
        var sum = sellprice * count
        var totalcom_sum = parseFloat(original_price) + parseFloat(sum)
        if (document.querySelector(".totalcom-section").querySelector(".totalcom-price")) {
            document.querySelector(".totalcom-section").querySelector(".totalcom-price").innerText = totalcom_sum;
        } else {
            document.querySelector(".firstpay-section").querySelector(".firstpay-price").innerText = totalcom_sum;
        }
    }
}
//<!----------------END JS TOURIST PANEL---------------->
function create_array_data(type) {
    if (type == 'no-room') {
        for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
            data_day.push({
                "data_value": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                "data_id": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                "data_switch": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-switch")}`,
                "data_default": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-default")}`,

            })
        };
        for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
            data_month.push({
                "data_value": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                "data_id": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                "data_switch": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-switch")}`,
                "data_default": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-default")}`,
            })
        };
        for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
            data_year_birthdate.push({
                "data_value": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                "data_id": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                "data_switch": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-switch")}`,
                "data_default": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-default")}`

            })
        };
        if (document.getElementsByClassName("passenger-info-content")[0].querySelector(".passexpiredate")) {
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_year_passport.push({
                    "data_value": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                    "data_switch": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-switch")}`,
                    "data_default": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-default")}`

                })
            };
        }
        if (document.querySelector(".nationalityCo")) {
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].querySelector(".nationalityCo").closest(".package-info-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_area.push({
                    "data_value": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".nationalityCo").closest(".package-info-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".nationalityCo").closest(".package-info-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                })
            };
        }
        if (document.getElementsByClassName("passenger-info-content")[0].querySelector(".passportIssueDate")) {
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].querySelector(".passportIssueDate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_year_visa.push({
                    "data_value": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".passportIssueDate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.getElementsByClassName("passenger-info-content")[0].querySelector(".passportIssueDate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,

                })
            };
        };
    } else if (type == 'has-room') {
        if (document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday")) {
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_day.push({
                    "data_value": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                    "data_switch": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-switch")}`,
                    "data_default": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".day").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-default")}`,

                })
            };
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_month.push({
                    "data_value": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                    "data_switch": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-switch")}`,
                    "data_default": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".month").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-default")}`,
                })
            };
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_year_birthdate.push({
                    "data_value": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                    "data_switch": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-switch")}`,
                    "data_default": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".birthday").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-default")}`

                })
            };
        }

        if (document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".passexpiredate")) {
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_year_passport.push({
                    "data_value": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                    "data_switch": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-switch")}`,
                    "data_default": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".passexpiredate").closest(".package-info-item").querySelector(".year").closest(".passenger-date-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-default")}`

                })
            }
        };

        if (document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".countryofresistance")) {
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".countryofresistance").closest(".package-info-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_area.push({
                    "data_value": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".countryofresistance").closest(".package-info-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".countryofresistance").closest(".package-info-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                })
            }
        }


        if (document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".nationalityCo")) {
            for (var i = 0; i < document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".nationalityCo").closest(".package-info-item").querySelector(".drop-item").getElementsByClassName("li-item").length; i++) {
                data_area.push({
                    "data_value": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".nationalityCo").closest(".package-info-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-value")}`,
                    "data_id": `${document.getElementsByClassName("passenger-info-content")[0].getElementsByClassName("passenger")[0].querySelector(".nationalityCo").closest(".package-info-item").querySelector(".drop-item").getElementsByClassName("li-item")[i].getAttribute("data-id")}`,
                })
            }
        }

    }

};

/*------------------START FUNCTION CHECK COUNTRY OWNER-----------------------*/
fetch('/Client_CountryId_Library.bc')
    .then(response => response.json())
    .then(data => {
        const country = data.filter((item) => item.dmnid == document.querySelector(".main-container").getAttribute("data-dmnid")).map((item) => item.country);
        const country_id = data.filter((item) => item.dmnid == document.querySelector(".main-container").getAttribute("data-dmnid")).map((item) => item.country_id);
        if (country.length > 0) {
            $(".package-info-item").find(".autocompleteCOUNTRY").each(function () {
                $(this).closest(".package-info-item").find(".area-id").val(country_id);
                $(this).val(country);
                $(this).closest(".passenger-info-content").find(".NationalCode").addClass("not-active")
                $(this).closest(".passenger-info-content").find(".NationalCode").removeClass("necessary")
                $(this).closest(".passenger-info-content").find(".NationalCode").val('-')

            })
        } else {
            $(".package-info-item").find(".autocompleteCOUNTRY").each(function () {
                $(this).closest(".package-info-item").find(".area-id").val('1002236');
                $(this).val('Iran');
                if ($(".internal").val() == 1) {
                    $(this).closest(".passenger-info-content").find(".passportcode").closest(".package-info-item").addClass("internal")
                    $(this).closest(".passenger-info-content").find(".passportcode").removeClass("necessary")
                    $(this).closest(".passenger-info-content").find(".passexpiredate").closest(".package-info-item").addClass("internal")
                    $(this).closest(".passenger-info-content").find(".passexpiredate").removeClass("necessary")
                    $(this).closest(".passenger-info-content").find(".DrawerCo").closest(".package-info-item").addClass("internal")
                    $(this).closest(".passenger-info-content").find(".DrawerCo").addClass("not-active")
                    $(this).closest(".passenger-info-content").find(".passportcode").addClass("not-active")
                    $(this).closest(".passenger-info-content").find(".passexpiredate").addClass("not-active")
                    $(this).closest(".passenger-info-content").find(".not-active").val("-")
                } else {
                    $(this).closest(".passenger-info-content").find(".passportcode").closest(".package-info-item").removeClass("internal")
                    $(this).closest(".passenger-info-content").find(".passportcode").addClass("necessary")
                    $(this).closest(".passenger-info-content").find(".DrawerCo").addClass("not-active")
                    $(this).closest(".passenger-info-content").find(".DrawerCo").removeClass("necessary")
                    $(this).closest(".passenger-info-content").find(".DrawerCo").closest(".package-info-item").hide()
                }

            })
        }
    }).catch(error => console.error(error))
/*------------------END FUNCTION CHECK COUNTRY OWNER-----------------------*/