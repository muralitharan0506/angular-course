import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, Inject, Injector, OnInit, ViewChild} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import {AppConfig, CONFIG_TOKEN} from './config';
import {COURSES} from '../db-data';
import {CoursesService} from './courses/courses.service';
import {createCustomElement} from '@angular/elements';
import {CourseTitleComponent} from './course-title/course-title.component';
import { CourseCardComponent } from './courses/course-card/course-card.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    courses: Course[] = COURSES;

    coursesTotal = this.courses.length;

    constructor(
        private coursesService: CoursesService,
        @Inject(CONFIG_TOKEN) private config: AppConfig,
        private injector: Injector) {

    }

    ngOnInit() {

        const htmlElement = createCustomElement(CourseTitleComponent, {injector:this.injector});

        customElements.define('course-title', htmlElement);

    }

    onEditCourse() {

            this.courses[1].category = 'ADVANCED';

    }

    @ViewChild('refdiv')
    divele:ElementRef

    @ViewChild('ref1')
    card1:CourseCardComponent
    
    @ViewChild('ref2')
    card2:CourseCardComponent

    @ViewChild('ref2',{read:ElementRef})
    card2_div:CourseCardComponent
    save(course: Course) {
        console.log("card1 ",this.card1);
        console.log("card2 ",this.card2);
        console.log("div1 ",this.divele);
        console.log("card2_div ",this.card2_div);


        
        this.coursesService.saveCourse(course)
            .subscribe(
                () => console.log('Course Saved!')
            );
    }


}
