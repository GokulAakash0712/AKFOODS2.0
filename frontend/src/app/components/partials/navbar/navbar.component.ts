import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isMenu = false;
  isToggle = true;
  isLoginMode = true;
  cartQuantity = 0;
  user: User = new User();
  form = false;
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  isRegisterSubmitted = false;
  isLoginSubmitted = false;
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.getElementById(tree.fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });

    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
      this.cdr.detectChanges();
    });

    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      this.cdr.detectChanges();
    });

    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]+$/),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-z0-9_]{3,}@[a-z0-9]{3,}\.[a-z]{2,}(\.[a-z]{2,})?$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get rfc() {
    return this.registerForm.controls;
  }

  get fc() {
    return this.loginForm.controls;
  }

  registerSubmit() {
    this.isRegisterSubmitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      address: fv.address,
    };

    this.userService.register(user).subscribe((_) => {
      this.router.navigateByUrl('/');
      this.form = false;
      this.isRegisterSubmitted = false;
      this.registerForm.reset();
    });
  }

  submit() {
    this.isLoginSubmitted = true;
    if (this.loginForm.invalid) return;

    this.userService
      .login({
        email: this.fc['email'].value,
        password: this.fc['password'].value,
      })
      .subscribe(() => {
        this.router.navigateByUrl('/');
        this.form = false;
        this.isLoginSubmitted = false;
        this.loginForm.reset();
      });
  }

  btnClick() {
    this.form = true;
  }

  times() {
    this.form = false;
    this.isLoginSubmitted = false;
    this.isRegisterSubmitted = false;
  }

  toggle() {
    this.isMenu = !this.isMenu;
    this.isToggle = !this.isToggle;
  }

  logout() {
    this.userService.logout();
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  get isAuth() {
    return this.user.token;
  }
}
