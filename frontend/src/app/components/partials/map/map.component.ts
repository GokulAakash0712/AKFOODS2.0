// src/app/components/pages/user/map/map.component.ts
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map: google.maps.Map | undefined;
  private marker: google.maps.Marker | undefined;

  @Input() order!: Order;
  @Input() readonly = false;
  @Output() locationChanged = new EventEmitter<google.maps.LatLngLiteral>();

  center: google.maps.LatLngLiteral = {
    lat: 11.74348,
    lng: 78.04762,
  };
  zoom = 16;
  display: google.maps.LatLngLiteral | undefined;

  ngOnInit(): void {}

  findCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCenter: google.maps.LatLngLiteral = {
            lat: latitude,
            lng: longitude,
          };

          console.log('Updating center to:', newCenter);

          this.center = newCenter;
          this.display = newCenter;

          if (this.map) {
            this.map.setCenter(newCenter);
            this.addMarker(newCenter);
          }
        },
        (error) => {
          console.error('Error obtaining location:', error);
          alert(
            'Unable to retrieve your location. Please ensure geolocation is enabled.'
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  private addMarker(position: google.maps.LatLngLiteral) {
    if (this.map) {
      if (this.marker) {
        this.marker.setPosition(position);
        this.map.panTo(position);
      } else {
        this.marker = new google.maps.Marker({
          position,
          map: this.map,
          title: 'You are here',
        });
      }
      // Emit the location change
      this.locationChanged.emit(position);
    }
  }

  onMapReady(event: any) {
    this.map = event as google.maps.Map;
    if (this.map) {
      this.map.setCenter(this.center); // Center the map on initialization
    }
  }
}
