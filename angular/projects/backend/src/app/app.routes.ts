import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { CategoryComponent } from './components/category/category.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { authGuard } from '../../../tools/src/lib/guards/auth.guard';
import { adminGuard } from '../../../tools/src/lib/guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [authGuard, adminGuard],
        children: [
            {
                path: '',
                redirectTo: 'posts',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'posts',
                children: [
                    {
                        path: '',
                        component: PostsComponent
                    },
                    {
                        path: 'categories',
                        component: CategoryComponent
                    },
                    {
                        path: 'create',
                        component: NewPostComponent
                    },
                    {
                        path: 'edit/:slug',
                        component: EditPostComponent
                    },
                    {
                        path: '**',
                        redirectTo: '',
                        pathMatch: 'full'
                    },
                    
                ]
            },

        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }

];
