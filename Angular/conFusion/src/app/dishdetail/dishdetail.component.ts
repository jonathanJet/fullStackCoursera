import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';



import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

    @ViewChild('cform') commentFormDirective;

    commentForm: FormGroup;
    comment: Comment;

    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {

      this.createForm();

  }

    createForm(): void {
        this.commentForm = this.fb.group({
            author: ['', Validators.required],
            rating: ['', Validators.required],
            comment: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.comment = this.commentForm.value;
        console.log(this.comment);
        this.commentForm = this.fb.group({
            author: ['', Validators.required],
            rating: ['', Validators.required],
            comment: ['', Validators.required]
        });
        this.commentFormDirective.resetForm();
    }

  ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
          .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

    goBack(): void {
        this.location.back();
    }

    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

}
