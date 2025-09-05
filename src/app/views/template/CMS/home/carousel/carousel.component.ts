import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { HeroSlideService } from 'src/app/core/services/pages/home/HeroSlide.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  environment                       : any       = environment
  slides: any[] = [];
  currentSlide = 0;
  loading = true;
  autoPlaySubscription?: Subscription;
  autoPlayEnabled = true;
  autoPlayInterval = 5000; // 5 seconds

 constructor(private heroSlideService: HeroSlideService) {}

 ngOnInit() {
    this.loadSlides();
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  loadSlides() {
    this.loading = true;
    this.heroSlideService.getSlides().subscribe({
      next: (slides) => {
        this.slides = slides.sort((a, b) => a.order - b.order);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading slides:', error);
        this.loading = false;
      }
    });
  }

  nextSlide( ) {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetAutoPlay();
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.resetAutoPlay();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoPlay();
  }

  navigateToLink(link: string) {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      // Handle internal navigation here if using Angular Router
      window.location.href = link;
    }
  }

  startAutoPlay() {
    // if (this.autoPlayEnabled && this.slides.length > 1) {
    //   this.autoPlaySubscription = interval(this.autoPlayInterval).subscribe(() => {
    //     this.nextSlide();
    //   });
    // }
  }

  stopAutoPlay() {
    if (this.autoPlaySubscription) {
      this.autoPlaySubscription.unsubscribe();
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

}
