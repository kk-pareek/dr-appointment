import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/http.service';
import { TrainingService } from 'src/app/training/training/training.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dr-facing',
  templateUrl: './dr-facing.component.html',
  styleUrls: ['./dr-facing.component.css']
})
export class DrFacingComponent implements OnInit {

  displayedColumns: string[] = ['number', 'name', 'actions'];
  pastTrainingsData = new MatTableDataSource();
  pastExcercisesChangedSubscription!: Subscription;
  url = 'https://doctor-appointmentapp-default-rtdb.asia-southeast1.firebasedatabase.app/patientsData.json'

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private theTrainingService: TrainingService,
    private db: AngularFireDatabase
    ) { }

  ngOnInit(): void {
    // this.pastExcercisesChangedSubscription = this.theHttpService.get(this.url).subscribe((pastExcercises: any) => {
    //   this.pastTrainingsData = new MatTableDataSource(pastExcercises);
    //   this.pastTrainingsData.sort = this.sort;
    //   this.pastTrainingsData.paginator = this.paginator;
    // })
    // this.theTrainingService.fetchPastExcercises();
    // this.theHttpService.get(this.url).subscribe((response:any) => {
    //   console.log(response.value);
    //   this.transformResponseAndLog(response);
    //   this.pastTrainingsData = new MatTableDataSource(response);
    //   this.pastTrainingsData.sort = this.sort;
    //   this.pastTrainingsData.paginator = this.paginator;
    // });
    // this.db.list('patientsData').snapshotChanges().subscribe((response:any) => {
    //   console.log(response);
    //     this.pastTrainingsData = new MatTableDataSource(response);
    //     this.pastTrainingsData.sort = this.sort;
    //     this.pastTrainingsData.paginator = this.paginator;
      
    // })

    this.db.list('patientsData').snapshotChanges().pipe(map((responseArray: any) => {
      return responseArray.map((responseArrayElement: any) => {
        return {
          id: responseArrayElement.payload.key,
          name: responseArrayElement.payload.doc,
          tokenNumber: responseArrayElement.payload.doc
        }
      })
    })).subscribe(response => {
      console.log(response);
    })
  }

  documentToDomainObject = (data:any) => {
    const object = data.payload.doc.data();
    object.id = data.payload.doc.id;
    return object;
}

  transformResponseAndLog(response: any) {
    let arr = [];
    for (let data in response) {
      arr.push(response.data);
    }
    console.log(arr);
  }

  ngAfterViewInit() {
  }

  applyFilter(event: any) {
    const filterText = event.target.value;
    this.pastTrainingsData.filter = filterText.trim().toLowerCase();
  }

  ngOnDestroy(): void {
      this.pastExcercisesChangedSubscription.unsubscribe();
  }

}
