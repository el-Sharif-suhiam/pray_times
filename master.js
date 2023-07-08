let btn = document.getElementById("btn");
    const container = document.getElementById("container");
    const theTime = new Date();
    const theDay = theTime.getDate();
    const theMonth = theTime.getMonth() + 1;
    const theYear = theTime.getFullYear();
    const mylocation = "latitude=30.7614&longitude=20.2193";
    const select = document.getElementById("city");
    const cityBtn = document.getElementById("city-btn");
    // *******************************************************************************
    function prayTiming(myData) {
      console.log(myData.data.date);
      let dateDiv = document.createElement("div");
      let boxDiv = document.createElement("div");
      boxDiv.className = "box";
      dateDiv.className = "date";
      let TimingDiv = document.createElement("div");
      TimingDiv.className = "pray-time";
      container.appendChild(boxDiv);
      boxDiv.appendChild(dateDiv);
      boxDiv.appendChild(TimingDiv);
      const times = myData.data.timings;
      const dateFormApi = myData.data.date.readable;
      const hijriDate = myData.data.date.hijri.date;
      const arabicDay = myData.data.date.hijri.weekday.ar;
      dateDiv.innerHTML = `
        <span> ${arabicDay}  ${hijriDate} </span>
        <p>${dateFormApi}</p>
        `;
      for (let i = 0; i < Object.keys(times).length; i++) {
        var objKey = Object.keys(times)[i];
        if (
          objKey == "Sunrise" ||
          objKey == "Sunset" ||
          objKey == "Imsak" ||
          objKey == "Midnight" ||
          objKey == "Firstthird" ||
          objKey == "Lastthird"
        ) {
          continue;
        } else {
          switch (objKey) {
            case "Fajr":
              TimingDiv.innerHTML += `
                  <div>
                  <span id="pray">الفجر</span> <span id="time">${times[objKey]}</span>
                  </div>
                  `;
              break;
            case "Dhuhr":
              TimingDiv.innerHTML += `
                  <div>
                  <span id="pray">الظهر</span> <span id="time">${times[objKey]}</span>
                  </div>
                  `;
              break;
            case "Asr":
              TimingDiv.innerHTML += `
                  <div>
                  <span id="pray">العصر</span> <span id="time">${times[objKey]}</span>
                  </div>
                  `;
              break;
            case "Maghrib":
              TimingDiv.innerHTML += `
                  <div>
                  <span id="pray">المغرب</span> <span id="time">${times[objKey]}</span>
                  </div>
                  `;
              break;
            case "Isha":
              TimingDiv.innerHTML += `
                  <div>
                  <span id="pray">العشاء</span> <span id="time">${times[objKey]}</span>
                  </div>
                  `;
              break;
            default:
              break;
          }
        }
      }
    }
    //********************************************************************************************

    function selectCity() {
      let userOption = select.value;
      let optionCity = "";
      let arbicCityName = "";
      switch (userOption) {
        case "Brega":
          optionCity = "&country=LY&city=Brega";
          arbicCityName = "البريقة";
          break;
        case "Benghazi":
          optionCity = "country=LY&city=Benghazi";
          arbicCityName = "بنغازي";
          break;
        case "Tripoli":
          optionCity = "country=LY&city=Tripoli";
          arbicCityName = "طرابلس";
          break;
        case "Cario":
          optionCity = "country=Egypt&city=Cario";
          arbicCityName = "القاهرة";
          break;
        case "Tunisia":
          optionCity = "country=Tunisia&city=Tunisia";
          arbicCityName = "تونس";
          break;
        case "Damascus":
          optionCity = "country=ٍSyria&city=Damascus";
          arbicCityName = "دمشق";
          break;
        // case "Jablah":
        //   optionCity = "country=Syria&city=Jablah";
        //   arbicCityName = "جبلة"
        //   break;
        case "Amman":
          optionCity = "country=Jordan&city=Amman";
          arbicCityName = "عمان";
          break;
        case "Riyadh":
          optionCity = "country=KSA&city=Riyadh";
          arbicCityName = "الرياض";
          break;
        case "Baghdad":
          optionCity = "country=IRAQ&city=Baghdad";
          arbicCityName = "بغداد";
          break;
        case "Jerusalem":
          optionCity = "country=Palestine&city=Jerusalem";
          arbicCityName = "القدس";
          break;
        case "Mecca":
          optionCity = "country=KSA&city=Mecca";
          arbicCityName = "مكة";
          break;
        default:
          break;
      }
      container.innerHTML = `<h2>مواقيت الصلاة حسب مدينة :
        ${arbicCityName}
    </h2>`;
      prayTime_2(theDay, theMonth, theYear, optionCity);
    }
    //********************************************************************************************************
    function prayTime(day, month, year, location) {
      fetch(
        `http://api.aladhan.com/v1/timings/${day}-${month}-${year}?${location}&method=1`
      )
        .then((myData) => myData.json())
        .then((myData) => prayTiming(myData));
    }

    btn.addEventListener("click", (e) => {
      let success = (location) => {
        let currentLocation = `latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`;
        container.innerHTML = "<h2>مواقيت الصلاة حسب موقعك الحالي</h2>";
        prayTime(theDay, theMonth, theYear, currentLocation);
      };
      let notSuccess = (notSucc) => {
        console.log(notSucc.message);
      };
      let loc = navigator.geolocation.getCurrentPosition(success, notSuccess);
    });

    function prayTime_2(day, month, year, location) {
      fetch(
        `http://api.aladhan.com/v1/timingsByCity?date=${day}-${month}-${year}&${location}&method=1`
      )
        .then((myData) => myData.json())
        .then((myData) => {
          prayTiming(myData);
        });
    }

    cityBtn.addEventListener("click", () => {
      container.innerHTML = `<h2>مواقيت الصلاة حسب مدينة :
        ${select.value}
    </h2>`;
      selectCity();
    });