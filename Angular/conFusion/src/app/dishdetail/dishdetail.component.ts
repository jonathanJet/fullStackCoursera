import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import {flyInOut, visibility, expand} from '../animations/app.animation';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '[@flyInOut]': 'true',
        'style': 'display: block;'
    },
    animations: [
        visibility(),
        flyInOut(),
        expand()
    ]
})

export class DishdetailComponent implements OnInit {

    @ViewChild('cform') commentFormDirective;

    commentForm: FormGroup;
    comment: Comment;

    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    errMess: string;
    dishcopy: Dish;
    visibility = 'shown';

    constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private baseURL) {

      this.createForm();

  }

    ngOnInit() {
        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.errMess = <any>errmess);
        this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishservice.getDish(params['id'])}))
            .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id);this.visibility = 'shown'; },
                errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    }

    createForm(): void {

        this.commentForm = this.fb.group({
            author: ['', [Validators.required,Validators.minLength(2)]],
            rating: [5, Validators.required],
            comment: ['', Validators.required],
        });

        this.commentForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();

    }

    onSubmit(): void {

        this.comment = this.commentForm.value;

        this.comment.date = new Date().toISOString();

        this.dishcopy.comments.push(this.comment);

        this.dishservice.putDish(this.dishcopy)
            .subscribe(dish => {
                    this.dish = dish; this.dishcopy = dish;
                },
                errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

        this.commentForm = this.fb.group({
            author: ['', Validators.required],
            rating: [5, Validators.required],
            comment: ['', Validators.required]
        });

        this.commentFormDirective.resetForm();

    }

    goBack(): void {
        this.location.back();
    }

    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    formErrors = {
        'author': '',
        'rating': '',
        'comment': ''
    };

    validationMessages = {
        'author': {
            'required':      'author is required.',
            'minlength':     'author must be at least 2 characters long.',
        },
        'rating': {
            'required':      'rating is required.'
        },
        'comment': {
            'required':      'Comment is required.'
        }
    };

    onValueChanged(data?: any) {
        if (!this.commentForm) { return; }
        const form = this.commentForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }



}
