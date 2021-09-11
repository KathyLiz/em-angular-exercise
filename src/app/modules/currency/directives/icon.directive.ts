import { Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIconDirective]'
})
export class IconDirective {
  @Input() defaultColor: string


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.defaultColor) {
      this.setBgColor(this.defaultColor)
    } else {
      this.setBgColor('#1BC5BD')
    }
  }

  setBgColor(color: string) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'color',
      color
    )
  }
}
