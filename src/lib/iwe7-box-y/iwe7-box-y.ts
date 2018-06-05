import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ElementRef } from '@angular/core';
import { Iwe7IcssService } from 'iwe7-icss';
import { BaseWithIcss } from 'iwe7-base';
import { Component, OnInit, Input, Injector } from '@angular/core';

@Component({
    selector: 'iwe7-box-y',
    templateUrl: 'iwe7-box-y.html',
    styleUrls: ['iwe7-box-y.scss'],
    providers: [Iwe7IcssService]
})
export class Iwe7BoxYComponent extends BaseWithIcss {
    height: number;
    width: number;
    @Input() ratio: number = 0.618;
    @Input() params: number = 1;
    
    _reversal: boolean = false;
    @Input()
    set reversal(val: any) {
        this._reversal = coerceBooleanProperty(val);
    }
    get reversal() {
        return this._reversal;
    }
    @Input() color: string;
    constructor(injector: Injector, public icss: Iwe7IcssService, public ele: ElementRef) {
        super(injector);
        this.setStyleInputs(["height", "color"]);
        this.getCyc('ngAfterContentInit').subscribe(res => {
            this.height = this.ele.nativeElement.clientHeight;
            if (this.reversal) {
                this.width = this.height / this.ratio * this.params;
            } else {
                this.width = this.height * this.ratio * this.params;
            }
            this.styleObj = {
                height: this.height + 'px',
                width: this.width + 'px'
            };
        });
    }
}
