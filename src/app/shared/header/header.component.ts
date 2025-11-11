import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Potřebné pro *ngIf

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], // Důležité pro použití *ngIf
  templateUrl: './header.component.html', 
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Signal pro sledování, zda je mobilní menu otevřené
  isMobileMenuOpen = signal(false);

  // Přepíná stav menu (otevřeno/zavřeno)
  toggleMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  // Metoda pro zavření menu (volaná po kliknutí na odkaz)
  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }

  // HostListener naslouchá události 'resize' (změna velikosti okna)
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Zavře menu, pokud se okno zvětší nad velikost mobilu (např. 768px)
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen.set(false);
    }
  }

  // Při inicializaci zkontrolujeme počáteční velikost
  ngOnInit() {
    this.onResize(new Event('resize'));
  }
}