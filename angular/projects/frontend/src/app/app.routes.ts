import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SinglePostComponent } from './components/single-post/single-post.component';

export const routes: Routes = [
    {
         path: '',
         component: HomeComponent,
    },
    {
        path: 'post/category/:title',
        component: HomeComponent,
   },
   {
    path: 'post/detail/:slug',
    component: SinglePostComponent,
},
{
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
},
];
