import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { PostsHome, PostsHomeService } from 'src/app/core/services/pages/home/posts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent {
  environment                       : any       = environment
  newsList: PostsHome[] = [];
  loading = false;
  displayForm = false;


   editItem            : any;
   eventType           : any               = EventTypes.Add;
   showForm            : boolean           = false;

  constructor(
    private newsService: PostsHomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPostsHome();
  }

  loadPostsHome(): void {
    this.loading = true;
    this.newsService
    .getAllPostsHome()
    .pipe(take(1), map((res:any)=> res?.data))
    .subscribe((data:any) => {
      this.newsList = data;
      this.loading = false;

    }, error =>{
      console.error('Error loading news:', error);
      // alert('Error loading news');
      this.loading = false;
    });
  }

  editPostsHome(data:any): void {
    this.editItem = data;
    this.eventType = EventTypes.Edit;
    this.showForm = true;

  }

  toggleDisplayForm(): void {
    this.displayForm = !this.displayForm;

  }

  deletePostsHome(id: number): void {
    if (confirm('Are you sure you want to delete this news item?')) {
      this.newsService.deletePostsHome(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.newsList = this.newsList.filter(news => news.id !== id);
            alert('PostsHome deleted successfully!');
          }
        },
        error: (error) => {
          console.error('Error deleting news:', error);
          alert('Error deleting news item');
        }
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }




  handleUpdatedItem(data:any){
    this.showForm = false;
    this.eventType = EventTypes.Add;
    this.newsList = this.newsList.map((item:any) =>{
      if(item.id === data.id){
        return data;
      }else{
        return item;
      }
    });
  }

   handleAdedNewItem(data:any){
    console.log({data});

    this.showForm = false;
    this.newsList = [data,...this.newsList];
  }

}
