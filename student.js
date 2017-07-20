'use.strict';
const readlineSync=require('readline-sync');
let studentList=[{}];
function main() {
    console.log(`1.添加学生
2.生成成绩单
3.退出`);
    let choose=readlineSync.question(`请输入你的选择: `);
    switch (choose){
        case 1: {
                    addStudent();
                    break;
        }
        case 2: {
                    makeReport();
                    break;
        }
        case 3: {
                    console.log('成功退出！');
        }
        default:{
            console.log('the input is erro!');
        }
    }

}
function addStudent() {
    console.log('请输入学生信息（格式：姓名，学号，民族，班级，学科：成绩，...）,按回车提交：');
    let studentInput = readlineSync.question();
    let studentArry = getStudentArry(studentInput);
    while (testInput(studentArry)===0){
        console.log('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
        studentInput = readlineSync.question();
        studentArry=getStudentArry(studentInput);
    }
    console.log(`学生${studentArry[0]}的信息被添加`);
    inputStudent(studentArry);
    main();

}
function inputStudent(student_info) {
     let student=new Object();
     student.name=student_info[0];
     student.id=student_info[1];
     student.nation=student_info[2];
     student.klass=student_info[3];
     student.math=student_info[5];
     student.chinese=student_info[7];
     student.english=student_info[9];
     student.code=student_info[11];
     studentList.push(student);
}
function getStudentArry(studentInfo){
    let studentString=studentInfo.split(',');
    studentString=studentString.split(':');
    return studentString;
}
function testInput(arry) {
    if (arry.length===12){
        return 1;
    }
    else {
        return 0;
    }

}
function makeReport() {
    console.log('请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
    let idInput=readlineSync.question();
    let idArry=getIdArry(idInput);
    while (testInputId(idArry)===0){
        console.log('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
        idInput=readlineSync.question();
        idArry=getIdArry(idInput);
    }
    printScoreList(idArry);

}
function getIdArry(arry) {
    return arry.split(',');
}
function testInputId(arry) {
    if (arry.length===10){
        return 1;
    }
    else {
        return 0;
    }
}
function printScoreList(idArryInfo) {
    let reportList=[];
    for(let i in studentList){
        if (idArryInfo.indexOf(studentList[i].id)!==-1){
            reportList.push(studentList[i]);
        }
    }
    console.log(`成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================`);
    for (let i in reportList){
        console.log(`${reportList[i].name}|${reportList[i].math}|${reportList[i].chinese}|${reportList[i].english}|${reportList[i].code}|${getToallScore(reportList[i])/4}|${getToallScore(reportList[i])}`);
    }
    console.log(`========================
全班总分平均数：${getAllScore(reportList)/reportList.length}
全班总分中位数：${getMidScore(reportList)}`);
}
function getToallScore(student) {
    return student.math+student.chinese+student.english+student.code;
}
function getAllScore(studentArry) {
    let  sum=0;
    for(let i in studentArry){
        sum+=getToallScore(studentArry[i]);
    }
    return sum;
}
function getMidScore(studentArry) {
    let score=[];
    for (let i in studentArry){
        let totallScore=getToallScore(studentArry[i]);
        score.push(totallScore[i]);
    }
    score.sort();
    if(score.length%2===0){
        return (score[score.length/2]+score[score.length/2-1])/2;
    }
    else {
        return score[score.length/2];
    }
}