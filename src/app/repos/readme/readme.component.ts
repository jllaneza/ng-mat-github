import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'marked';

import { ReposService } from '../repos.service';

declare const marked: any;

@Component({
  selector: 'app-repos-readme',
  template: '<ng-content></ng-content>'
})
export class ReadmeComponent implements OnInit, AfterViewInit {

  constructor(
    private service: ReposService,
    private route: ActivatedRoute,
    private elem: ElementRef) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getReadmeContent(params.username, params.repo);
    });
  }

  ngAfterViewInit() {
    this.elem.nativeElement.classList.add('markdown-body');
  }

  getReadmeContent(username: string, repo: string) {
    this.service.getReadme(username, repo)
      .subscribe(data => this.render(data));
  }

  render(data: string) {
    this.elem.nativeElement.innerHTML = marked(data);
  }

}
