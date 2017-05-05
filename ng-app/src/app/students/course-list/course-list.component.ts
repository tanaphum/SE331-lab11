import {Component, Input} from '@angular/core';
import {Student} from '../student';
import {Course} from '../course';
import {StudentsDataService} from "../../service/students-data.service";
import {Router} from "@angular/router";


@Component({
 selector: 'course-list',
 templateUrl: './course-list.component.html',
 styleUrls:['./course-list.component.css']
})
export class CourseListComponent {
  students: Student[];
  constructor(private studentDataService: StudentsDataService, private router: Router) {
    this.studentDataService.getStudentsData()
      .subscribe(students => this.students = students,
        (error : Error ) => {
          if (error.message === 'UnAuthorize'){
            this.router.navigate(['login'],{queryParams:{source:'student'}});
          }
        });
  }

  @Input() count:number;
  @Input('enrolledCourse') courses:Course;
  ngOnInit() {

  }

}
