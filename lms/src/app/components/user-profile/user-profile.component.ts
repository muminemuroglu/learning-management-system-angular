import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/IUser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: IUser | null = null;
  updatedName: string = '';
  updatedEmail: string = '';
  updatedPassword: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userProfileSync().subscribe({
      next: (data) => {
        if (data) {
          this.user = data;
          this.updatedName = data.name;
          this.updatedEmail = data.email;
          this.updatedPassword = data.password;
        }
      },
      error: () => console.error('Profil alınamadı')
    });
  }

  updateUser(): void {
    if (this.user) {
      const updatedUser: Partial<IUser> = {
        name: this.updatedName,
        email: this.updatedEmail,
        password: this.updatedPassword
      };

      this.authService.updateUser(this.user.id, updatedUser).subscribe({
        next: () => alert('Bilgiler güncellendi'),
        error: () => alert('Güncelleme başarısız')
      });
    }
  }
}

