import { Component, OnInit } from '@angular/core';
import {Course} from '../../students/course';
import {CourseServerService} from '../../service/course-server.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Student} from "../../students/student";
import {StudentsDataService} from "../../service/students-data.service";

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
  students: Student[];
  courses:Course[];
  constructor(private courseService:CourseServerService,private route:ActivatedRoute,private router: Router,private studentDataService: StudentsDataService) { }

  result:string;
  ngOnInit() {
    this.route.queryParams
      .subscribe((params : Params) => {
      this.result = params['result'];
    });
    this.studentDataService.getStudentsData()
      .subscribe(students => this.students = students,
        (error : Error ) => {
          if (error.message === 'UnAuthorize'){
            this.router.navigate(['login'],{queryParams:{source:'List Course'}});
          }
        });

    this.courseService.getCourse()
      .subscribe(courses=>this.courses = courses);
  }

}
