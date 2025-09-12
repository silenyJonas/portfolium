import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-side-bar',
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  socialLinks: { iconPath: string, link: string }[] = [
    { iconPath: 'assets/images/discord.png', link: 'https://discord.com/users/591933611058397185' },
    { iconPath: 'assets/images/github.png', link: 'https://github.com/silenyJonas' },
    { iconPath: 'assets/images/instagram.png', link: 'https://www.instagram.com/jonashx_' },
    { iconPath: 'assets/images/messenger.png', link: 'https://www.facebook.com/profile.php?id=61575420965652' },
    { iconPath: 'assets/images/spotify.png', link: 'https://open.spotify.com/user/31cq3vtyqb2ianliz54fbrz2nrd4' }
  ];
}