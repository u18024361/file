import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
})
export class FileComponent implements OnInit {
  file: File = null;
  files: any[];
  public progress: number;
  public message: string;
  test: any = 2;
  name: string = 'ss';
  studentList: any[] = [];
  image: any;
  applicationfile: any;
  formdata: any;
  prev_url:any;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private service: ServiceService, private http: HttpClient, private sanitizer : DomSanitizer) {}

  ngOnInit(): void {
    this.getmodules();
  }
  x() {
    this.service.postfile(this.formdata).subscribe((res) => {
      console.log(res);
    });
  }
  public uploadFilee(event) {
    this.file = event.target.files[0];
    this.formdata = new FormData();
    this.formdata.append('file', this.file, this.file.name);
    this.formdata.append('name', this.name);
  }

  getmodules() {
    this.service.tester().subscribe((res) => {
      this.studentList = res;
      console.log(this.studentList);
      console.log('Sssss');
    });
  }

  download(id) {
    this.service.downloadPdf(id).then((blob) => {
      saveAs(blob, 'testing.pdf');
    });
  }

  update(event) {
    let data = new FormData();
    data.append('resourceDescription', 'update');
    data.append('resourceCategoryId', '1');
    data.append('moduleId', this.test);
    data.append('id', '8');
    data.append('ResoucesName', event.target.files[0]);
    this.service.updateResource(data).subscribe((res) => {
      console.log(res);
    });
  }

  content(event) {
    let data = new FormData();
   
    data.append('content', event.target.files[0]);
    this.service.postfile(data).subscribe((res) => {
      console.log(res);
    });
  }

  clickEvent(id) {
    this.service.getPDF(id).subscribe((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  public Test(event) {
    let data = new FormData();
    data.append('resourceDescription', 'it works');
    data.append('resourceCategoryId', '1');
    data.append('moduleId', this.test);
    data.append('ResoucesName', event.target.files[0]);
    this.service.test(data).subscribe((res) => {
      console.log(res);
    });
  }

  Log(): void {
    console.log(this.file);
    // this.service.postfile(this.file).subscribe((result) => {

    //   console.log(result)
    //this._router.navigate([this._returnUrl]);

    //});
  }

  //aplication
  ApplicationImage(event) {
    console.log(event.target.files[0]);
    this.image = event.target.files[0];
    console.log(this.image);
  }
  ApplicationFile(event) {
    console.log(event.target.files[0]);
    this.applicationfile = event.target.files[0];
    console.log(this.applicationfile);
  }

  Application() {
    let data = new FormData();
    data.append('tutorName', 'calvin');
    data.append('TutorSurname', '1');
    data.append('tutorCell', '7777777');
    data.append('tutorAbout', 'hi');
    data.append('moduleId', '2');
    data.append('tutorEmail', 'calvin@gmail.com');
    data.append('tutorPhoto', this.image);
    data.append('file', this.applicationfile);
    this.service.Application(data).subscribe((res) => {
      console.log(res);
    });
  }

  video(){
    this.service.video(4).subscribe((res) => {
      console.log(res);
      var URL = window.URL;
      this.prev_url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res));
    });
  }
}
