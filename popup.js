// START OF USER MODIFY SECTION
    // DEFINE YOUR COURSES AND TIMETABLE HERE

    // courses
    const courses = [
        {no:1 ,code:"SCS3204", display_name:"Management", course_index:"176"},
        {no:2,code:"SCS3207", display_name:"Software Quality Assurance", course_index:"179"},
        {no:3 ,code:"SCS3208", display_name:"Software Project Management", course_index:"180"},
        {no:4 ,code:"SCS3214", display_name:"Group Project 2", course_index:"239"},
        {no:5 ,code:"SCS3215", display_name:"Professional Practice", course_index:"187"},
        {no:6 ,code:"SCS3203", display_name:"Middleware Architecture", course_index:"230"},
        {no:7 ,code:"SCS3206", display_name:"Graph Theory", course_index:"246"},
        {no:8 ,code:"SCS3210", display_name:"System & Network Administration", course_index:"240"},
        {no:9 ,code:"SCS3201", display_name:"Machine Learning and Neural Computing", course_index:"242"},
        {no:10 ,code:"E401", display_name:"Tech Talks", course_index:""},
    ]

    // timetable data in semester
    const timetable_data ={
        "1":{
            0:null,
            1:null,
            2:null,
            3:null,
            4:{display:"Interval",course_no: null},
            5:{display:"SCS 3203 L",course_no: 6},
            6:{display:"SCS 3203 L", course_no:6},
            2:{display:"SCS 3210 L",course_no: 8},
            3:{display:"SCS 3210 L",course_no: 8},
            9:null,
        },
        "2":{
            0:null,
            1:null,
            2:null,
            3:null,
            4:{display:"Interval",course_no: null},
            5:{display:"SCS 3207 L", course_no: 2},
            6:{display:"SCS 3207 L", course_no: 2},
            7:{display:"SCS 3201", course_no: 9},
            8:{display:"SCS 3201", course_no: 9},
            9:null,
        },
        3:{
            0:{display:"SCS 3214 L", course_no: 4},
            1:{display:"SCS 3214 L", course_no: 4},
            2:{display:"SCS 3215 L", course_no: 5},
            3:{display:"SCS 3215 L", course_no: 5},
            4:{display:"Interval",course_no: null},
            5:{display:"SCS 3206 L", course_no: 7},
            6:{display:"SCS 3206 L", course_no: 7},
            7:null,
            8:null,
            9:null,
        },
        4:{
            0:{display:"", course_no: null},
            1:{display:"", course_no: null},
            2:{display:"SCS 3214 L", course_no: 4},
            3:{display:"SCS 3214 L", course_no: 4},
            4:{display:"Interval",course_no: null},
            5:{display:"Tech Talks",course_no: null},
            6:{display:"Tech Talks",course_no: null},
            7:{display:"SCS  3204 L", course_no: 1},
            8:{display:"SCS  3204 L", course_no: 1},
            9:null,
        },
        5:{
            0:{display:"SCS 3208 L", course_no: 3},
            1:{display:"SCS 3208 L", course_no: 3},
            2:null,
            3:null,
            4:{display:"Interval",course_no: null},
            5:null,
            6:null,
            7:null,
            8:null,
            9:null,
        }
    }
// END OF USER MODIFY SECTION 
    
    const COURSE_BASE_URL = "https://ugvle.ucsc.cmb.ac.lk/course/view.php?id=";
    
 // timetable timeslots
    const time_map = {
        0:"8.00 -9.00",
        1:"9.00 -10.00",
        2:"10.00 -11.00",
        3:"11.00 -12.00",
        4:"12.00 -13.00",
        5:"13.00 -14.00",
        6:"14.00 -15.00",
        7:"15.00 -16.00",
        8:"16.00 -17.00",
        9:"17.00 -18.00",
        10:"18.00 -19.00",
    }

    // days in the week
    const day_map = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

    const button_section = document.getElementById("button-section");
    const btn_set = button_section.querySelectorAll("button");

    btn_set.forEach(( btn, index)=>{
        btn.addEventListener( "click", fill_timetable);
        btn.day_in_week = index+1;
    })

function fill_course_list(){
    // fill course list
    let course_list  = document.getElementById("cource-list");
    var list = "";
    for ( i in courses){
        list += `<div class="icon">
                    <a href="${COURSE_BASE_URL+ courses[i].course_index}" target="_black"><i class="fa fa-graduation-cap"></i>${courses[i].code} ${courses[i].display_name}
                    </a>
                </div>`;
    }

    course_list.innerHTML = list;
    fill_timetable();
}

function fill_timetable(e=null) {
    // get day of the week
    var date = document.getElementById("date");
    if(e == null || (e !=null &&  e.target.day_in_week == null)){
        let date_obj = new Date()
        day_in_week = date_obj.getDay()

        if(day_in_week == 0 || day_in_week==6 ){
            day_in_week = 1
        }
    }else{
        day_in_week = e.currentTarget.day_in_week
    }
    
    let btn = button_section.querySelector(`#btn-${day_in_week}`);
    
    for (i in btn_set){
        btn_set.item(i).classList.remove("selected-day-btn")
    }
    
    btn.classList.add("selected-day-btn");
    date.innerHTML = day_map[day_in_week-1];


    // map timetable data with time
    var mapped_data = {}
    for (x in timetable_data[day_in_week]){
        mapped_data[time_map[x]] = timetable_data[day_in_week][x]
    }



    // dynamically create table body
    let html = "";
    for (time in mapped_data){
            html += `
            <tr>
                <td>${time}</td>
                <td>`;
                if(mapped_data[time] == null){
                    html += "";
                }else if(mapped_data[time].course_no == null){
                    html += `${mapped_data[time].display}`;
                }else{
                    let course = courses.filter( (cource) =>{
                        return cource.no == mapped_data[time].course_no? true:false;
                    }) [0];
                    html += `<a class="timetable-link" target="_blank" href="${COURSE_BASE_URL+ course.course_index}">${mapped_data[time].display}</a>`;
                }
            html += `</td>
                </tr>
            `;
    }
    timetable.innerHTML = html;
}

fill_course_list()