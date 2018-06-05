import { ElementRef } from '@angular/core';
import { Iwe7IcssService } from 'iwe7-icss';
import { BaseWithIcss } from 'iwe7-base';
import { Component, OnInit, Input, Injector } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
@Component({
    selector: 'iwe7-box-x',
    templateUrl: 'iwe7-box-x.html',
    styleUrls: ['iwe7-box-x.scss'],
    providers: [Iwe7IcssService]
})
export class Iwe7BoxXComponent extends BaseWithIcss {
    height: number;
    width: number;

    @Input() ratio: number = 0.618;
    @Input() params: number = 1;
    _reversal: boolean = true;
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
            const ele: HTMLElement = this.ele.nativeElement;
            const parent: HTMLElement = ele.parentElement;
            this.width = parent.clientWidth;
            if (this.reversal) {
                this.height = this.width * this.ratio * this.params;
            } else {
                this.height = this.width / this.ratio * this.params;
            }
            this.styleObj = {
                height: this.height + 'px',
                width: this.width + 'px'
            };
        });
    }
}
