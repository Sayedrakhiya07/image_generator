import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageGeneratorComponent } from "./image-generator/image-generator.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImageGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'image_generator';
}
