import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './image-generator.component.html',
  styleUrl: './image-generator.component.scss',
})
export class ImageGeneratorComponent {

  prompt: string = '';
  generatedImageUrl: string | null = null;


  generateImage() {
    if (!this.prompt.trim()) {
      alert('Please enter a prompt!');
      return;
    }

    const payload = { prompt: this.prompt };
    fetch('http://localhost:3020/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      return response.json();
    }).then(data => {
      this.generatedImageUrl = "D:\\Subhendu-Roy\\image_generation\\image_generation\\" + data.filename;
    }).catch(error => {
      console.error(error);
      alert('Failed to generate image');
    });

  }
}
