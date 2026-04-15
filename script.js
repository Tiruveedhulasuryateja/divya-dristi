// DROPDOWNS
document.addEventListener("DOMContentLoaded", function () {

    const hour = document.getElementById("hour");
    const minute = document.getElementById("minute");

    // DROPDOWNS
    for (let i = 0; i < 24; i++) {
        hour.innerHTML += `<option value="${i}">${i.toString().padStart(2, '0')}</option>`;
    }

    for (let i = 0; i < 60; i += 5) {
        minute.innerHTML += `<option value="${i}">${i.toString().padStart(2, '0')}</option>`;
    }

});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("revealBtn").addEventListener("click", calculate);
});
// ZODIAC RESULT
window.calculate = function () {

    let dob = document.getElementById("dob").value;
    let hour = document.getElementById("hour").value;
    let minute = document.getElementById("minute").value;

    if (!dob) {
        alert("Enter DOB");
        return;
    }

    let date = new Date(dob);
    date.setHours(hour || 0);
    date.setMinutes(minute || 0);

    let chart = ZodiacCalculator(date);

    document.getElementById("result").innerHTML = `
        <div class="result-box">
            <div class="result-header">
                <div class="sign-circle">${chart.MoonSymbol}</div>
                <div>
                    <div class="sign-name">${chart.MoonRashiSanskrit} RASHI</div>
                    <div class="sign-sub">${chart.MoonRashi} · ${chart.Element}</div>
                </div>
            </div>

            <div class="badge-row">
                <span class="badge bg">${chart.Element}</span>
                <span class="badge bp">${chart.Quality}</span>
                <span class="badge bt">${chart.RashiLord}</span>
            </div>

            <div class="detail-grid">
                <div class="di"><div class="dl">SUN SIGN</div><div class="dv">${chart.SunSign}</div></div>
                <div class="di"><div class="dl">MOON RASHI</div><div class="dv">${chart.MoonRashi}</div></div>
                <div class="di"><div class="dl">NAKSHATRA</div><div class="dv">${chart.Nakshatra}</div></div>
                <div class="di"><div class="dl">PADA</div><div class="dv">${chart.NakshatraPada}</div></div>
                <div class="di"><div class="dl">LAGNA</div><div class="dv">${chart.Lagna}</div></div>
                <div class="di"><div class="dl">NAKSHATRA LORD</div><div class="dv">${chart.NakshatraLord}</div></div>
                <div class="di"><div class="dl">LUCKY STONE</div><div class="dv">${chart.LuckyStone}</div></div>
                <div class="di"><div class="dl">LUCKY NUMBER</div><div class="dv">${chart.LuckyNumber}</div></div>
            </div>

            <div class="trait-box">
                <p class="trait-text">${chart.Trait}</p>
            </div>
        </div>
    `;
};
function ZodiacCalculator(date){

    let jd = toJulian(date);
    let ayanamsa = lahiriAyanamsa(jd);

    let moon = normalize(moonLongitude(jd) - ayanamsa);
    let sun = normalize(sunLongitude(jd) - ayanamsa);

    let rashiIndex = Math.floor(moon / 30);
    let nakIndex = Math.floor(moon / (360/27));
    let pada = Math.floor((moon % (360/27)) / (360/108)) + 1;

    return {
        SunSign: getSunSign(date),
        MoonRashi: RashiWestern[rashiIndex],
        MoonRashiSanskrit: RashiNames[rashiIndex],
        MoonSymbol: RashiSymbols[rashiIndex],
        RashiLord: RashiLords[rashiIndex],
        Element: RashiElements[rashiIndex],
        Quality: RashiQualities[rashiIndex],
        Trait: RashiTraits[rashiIndex],
        LuckyStone: RashiLuckyStones[rashiIndex],
        LuckyNumber: RashiLuckyNumbers[rashiIndex],
        Nakshatra: NakshatraNames[nakIndex],
        NakshatraPada: pada,
        NakshatraLord: NakshatraLords[nakIndex],
        Lagna: RashiWestern[rashiIndex]
    };
}
function toJulian(date){
    return (date / 86400000) + 2440587.5;
}

function normalize(a){
    a%=360;
    return a<0?a+360:a;
}

function lahiriAyanamsa(jd){
    let T = (jd - 2415020.0) / 36524.2199;
    return 23.2542972 + 1.3945583*T - 0.0000093*T*T;
}

function sunLongitude(jd){
    let T = (jd - 2451545.0)/36525;
    let M = normalize(357.529 + 35999.05*T);
    return normalize(280.466 + 36000.77*T + 1.914*Math.sin(M*Math.PI/180));
}

function moonLongitude(jd){
    let T = (jd - 2451545.0)/36525;

    let L0 = 218.316 + 481267.881*T;
    let M = 134.963 + 477198.867*T;

    let Mr = M * Math.PI/180;

    let lon = L0 + 6.289 * Math.sin(Mr);

    return normalize(lon);
}

const RashiNames = ["Mesha","Vrishabha","Mithuna","Karka","Simha","Kanya","Tula","Vrishchika","Dhanu","Makara","Kumbha","Meena"];

const RashiWestern = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

const RashiSymbols = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

const RashiLords = ["Mars","Venus","Mercury","Moon","Sun","Mercury","Venus","Mars","Jupiter","Saturn","Saturn","Jupiter"];

const RashiElements = ["Fire","Earth","Air","Water","Fire","Earth","Air","Water","Fire","Earth","Air","Water"];

const RashiQualities = ["Cardinal","Fixed","Mutable","Cardinal","Fixed","Mutable","Cardinal","Fixed","Mutable","Cardinal","Fixed","Mutable"];


const RashiTraits = [
"Bold and courageous, always ready to take initiative and lead from the front.",
"Grounded and reliable, you value stability, comfort, and long-term security.",
"Curious and adaptable, you thrive on communication and learning new ideas.",
"Nurturing and emotional, you deeply care for family and close relationships.",
"Radiant and confident, you naturally attract attention and leadership roles.",
"Analytical and detail-oriented, you strive for perfection in everything you do.",
"Balanced and diplomatic, you seek harmony and fairness in all situations.",
"Intense and passionate, you possess deep emotional strength and determination.",
"Adventurous and optimistic, you love exploring new ideas and experiences.",
"Disciplined and hardworking, you are focused on success and long-term goals.",
"Visionary and innovative, you think ahead and embrace unique perspectives.",
"Dreamy and intuitive, you are deeply connected to emotions and spirituality."
];

const RashiLuckyNumbers = ["1,9","2,6","3,7","2,7","1,4","5,6","6,9","1,8","3,9","6,8","4,8","3,7"];

const RashiLuckyStones = ["Ruby","Diamond","Emerald","Pearl","Ruby","Emerald","Diamond","Coral","Sapphire","Neelam","Neelam","Pukhraj"];

const NakshatraNames = ["Ashwini","Bharani","Krittika","Rohini","Mrigashirsha","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];

const NakshatraLords = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury","Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury","Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];

// 🌞 PLANETS (FIXED CENTER)
(function(){

    const ps = document.getElementById("planetSystem");
    const center = ps.clientWidth / 2;

    const planets = [
        {name:"Mercury",color:"#b0a090",size:4,orbit:30,speed:1.5},
        {name:"Venus",color:"#f0d080",size:6,orbit:45,speed:1.2},
        {name:"Earth",color:"#4da6ff",size:6,orbit:60,speed:1},
        {name:"Mars",color:"#e05030",size:5,orbit:75,speed:0.9},
        {name:"Jupiter",color:"#d4a060",size:10,orbit:95,speed:0.6},
        {name:"Saturn",color:"#c0b090",size:9,orbit:115,speed:0.5},
        {name:"Uranus",color:"#80d0ff",size:6,orbit:130,speed:0.4},
        {name:"Neptune",color:"#4060ff",size:6,orbit:145,speed:0.3},
        {name:"Pluto",color:"#aaa",size:4,orbit:160,speed:0.25}
    ];
	
    planets.forEach(p=>{

        // ORBIT
        const ring=document.createElement("div");
        ring.className="orbit-ring";
        ring.style.width=(p.orbit*2)+"px";
        ring.style.height=(p.orbit*2)+"px";
        ring.style.left=(center-p.orbit)+"px";
        ring.style.top=(center-p.orbit)+"px";
        ps.appendChild(ring);

        // PLANET
        const planet=document.createElement("div");
        planet.className="planet";
        planet.style.width=p.size+"px";
        planet.style.height=p.size+"px";
        planet.style.background=p.color;

        // LABEL
        const label=document.createElement("div");
        label.className="planet-label";
        label.innerText=p.name;
        planet.appendChild(label);

        // SATURN RING
        if(p.name==="Saturn"){
            const satRing=document.createElement("div");
            satRing.className="saturn-ring";
            planet.appendChild(satRing);
        }

        ps.appendChild(planet);

        let angle=Math.random()*Math.PI*2;

        function animate(){
            angle+=0.01*p.speed;

            let x=center + p.orbit*Math.cos(angle) - p.size/2;
            let y=center + p.orbit*Math.sin(angle) - p.size/2;

            planet.style.left=x+"px";
            planet.style.top=y+"px";

            requestAnimationFrame(animate);
        }

        animate();
    });

})();

function getSunSign(date) {

    let m = date.getMonth() + 1;
    let d = date.getDate();

    if ((m==3 && d>=21)||(m==4 && d<=19)) return "Aries ♈";
    if ((m==4 && d>=20)||(m==5 && d<=20)) return "Taurus ♉";
    if ((m==5 && d>=21)||(m==6 && d<=20)) return "Gemini ♊";
    if ((m==6 && d>=21)||(m==7 && d<=22)) return "Cancer ♋";
    if ((m==7 && d>=23)||(m==8 && d<=22)) return "Leo ♌";
    if ((m==8 && d>=23)||(m==9 && d<=22)) return "Virgo ♍";
    if ((m==9 && d>=23)||(m==10 && d<=22)) return "Libra ♎";
    if ((m==10 && d>=23)||(m==11 && d<=21)) return "Scorpio ♏";
    if ((m==11 && d>=22)||(m==12 && d<=21)) return "Sagittarius ♐";
    if ((m==12 && d>=22)||(m==1 && d<=19)) return "Capricorn ♑";
    if ((m==1 && d>=20)||(m==2 && d<=18)) return "Aquarius ♒";

    return "Pisces ♓";
}
// 🌙 MOON 27 STARS
(function(){

    const svg=document.getElementById("moonSvg");
    const group=document.createElementNS("http://www.w3.org/2000/svg","g");

    svg.appendChild(group);

    for(let i=0;i<27;i++){
        let angle=(i/27)*2*Math.PI - Math.PI/2;
        let x=35 + 30*Math.cos(angle);
        let y=35 + 30*Math.sin(angle);

        let star=document.createElementNS("http://www.w3.org/2000/svg","circle");

        star.setAttribute("cx",x);
        star.setAttribute("cy",y);
        star.setAttribute("r","2");

        let colors=["#ffffff","#ffd6a5","#ffe9a0"];
        star.setAttribute("fill",colors[i%3]);

        group.appendChild(star);
    }

    let rot=0;
    function animate(){
        rot+=0.2;
        group.setAttribute("transform","rotate("+rot+" 35 35)");
        requestAnimationFrame(animate);
    }

    animate();

})();

if (navigator.share) {
    navigator.share({
        title: 'Divya Dristi',
        text: 'Check your birth chart here!',
        url: window.location.href
    });
}
function downloadPDF() {

    const element = document.querySelector(".result-box");

    const opt = {
        margin: 0,
        filename: 'DivyaDristi_Result.pdf',
        image: { type: 'jpeg', quality: 1 },

        html2canvas: {
            scale: 3,              // HIGH QUALITY
            useCORS: true,
            scrollY: 0
        },

        jsPDF: {
            unit: 'px',
            format: [element.offsetWidth, element.offsetHeight],
            orientation: 'portrait'
        }
    };

    html2pdf().set(opt).from(element).save();
}
function shareResult() {
    if (navigator.share) {
        navigator.share({
            title: 'Divya Dristi Astrology',
            text: 'Check your birth chart here 🔮',
            url: window.location.href
        });
    } else {
        // fallback for desktop
        window.open(`https://wa.me/?text=Check this astrology app: ${window.location.href}`);
    }
}
