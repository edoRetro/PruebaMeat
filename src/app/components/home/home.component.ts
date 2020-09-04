import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { SubscriptionForm } from 'src/app/models/subscriptionForm';
import { ArticleService } from 'src/app/services/article/article.service';
import { NewsletterService } from 'src/app/services/newsletter/newsletter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articleList: Article[] = [];
  categorySelected: string = "";
  showMessage: boolean = false;

  newsletterForm: FormGroup;

  constructor(private articleServices: ArticleService,
    private newsLetterServices: NewsletterService) { }

  ngOnInit(): void {

    this.newsletterForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    })

    this.articleServices.getAll(this.categorySelected).subscribe(response => this.articleList = response);
  }

  filterByCategory(category: string) {
    this.categorySelected = category;
    this.articleServices.getAll(this.categorySelected).subscribe(response => this.articleList = response);
  }

  subscribeToNewsletter() {
    let formValue: SubscriptionForm = this.newsletterForm.value;
    this.newsLetterServices.subscribe(formValue.firstName, formValue.lastName, formValue.email, formValue.phone).subscribe(response => {
      this.showMessage = true;
    });
  }

}
