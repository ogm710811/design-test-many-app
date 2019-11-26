import { Injectable } from '@angular/core';
import { TooltipDirective } from 'angular-bootstrap-md';

@Injectable({
  providedIn: 'root'
})
export class TooltipMenuService {
  private lastTooltipMenu: TooltipDirective;

  constructor() {}

  public registerTooltipMenu(currentTooltip: TooltipDirective) {
	if (this.lastTooltipMenu && this.lastTooltipMenu !== currentTooltip) {
		this.lastTooltipMenu.hide();
	}
	this.lastTooltipMenu = currentTooltip;
  }

  public checkBounds(x: number, y: number, scope: TooltipDirective) {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	const mouseX = x;
	const mouseY = y;
	const borderLimit = 150;
	// TOP
	const topWidth = screenWidth;
	const topHeight = borderLimit;
	// RIGHT
	const rightWidth = borderLimit;
	const rightHeight = screenHeight;
	// BOTTOM
	const bottomWidth = screenWidth;
	const bottomHeight = borderLimit;
	// LEFT
	const leftWidth = borderLimit;
	const leftHeight = screenHeight;
	// POSITIONS
	const top = { x: 0, y: 0 };
	const right = { x: screenWidth, y: 0 };
	const bottom = { x: 0, y: screenHeight };
	const left = { x: 0, y: 0 };

	let isInsideY = false;
	let isInsideX = false;
	let location = '';

	if (mouseX > right.x - rightWidth && mouseY < right.y + rightHeight) {
		scope.placement = 'left';
		location += 'right';
		isInsideX = true;
	} else if (mouseX < left.x + leftWidth && mouseY < left.y + leftHeight) {
		scope.placement = 'right';
		location += 'left';
		isInsideX = true;
	}
	if (mouseX < top.x + topWidth && mouseY < top.y + topHeight) {
		scope.placement = 'bottom';
		location += '-top';
		isInsideY = true;
	} else if (
		mouseX < bottom.x + bottomWidth &&
		mouseY > bottom.y - bottomHeight
	) {
		scope.placement = 'top';
		location += '-bottom';
		isInsideY = true;
	}

	// Check for Corners
	if (isInsideX && isInsideY) {
		scope.placement += ` center tooltip-${location}`;
	}

	/* DEBUG HELPED */

	// if (document.getElementsByClassName('debug-square').length === 0) {
	// 	this.createDebugArea(
	// 	0,
	// 	0,
	// 	screenWidth,
	// 	screenHeight,
	// 	'grey',
	// 	'0.2',
	// 	scope
	// 	);
	// 	this.createDebugArea(
	// 	top.x,
	// 	top.y,
	// 	topWidth,
	// 	topHeight,
	// 	'blue',
	// 	'0.2',
	// 	scope
	// 	);
	// 	this.createDebugArea(
	// 	right.x - rightWidth,
	// 	right.y,
	// 	rightWidth,
	// 	rightHeight,
	// 	'green',
	// 	'0.2',
	// 	scope
	// 	);
	// 	this.createDebugArea(
	// 	bottom.x,
	// 	bottom.y - bottomHeight,
	// 	bottomWidth,
	// 	bottomHeight,
	// 	'blue',
	// 	'0.2',
	// 	scope
	// 	);
	// 	this.createDebugArea(
	// 	left.x,
	// 	0,
	// 	leftWidth,
	// 	leftHeight,
	// 	'green',
	// 	'0.2',
	// 	scope
	// 	);
	// }
	// this.createDebugArea(mouseX - 5, mouseY - 5, 10, 10, 'green', '1', scope);
  }

  // private createDebugArea(x, y, width, height, color, opacity, scope) {
  // const container = document.getElementById('content');
  // const square = document.createElement('div');
  // square.className = 'debug-square';
  // square.style.width = width + 'px';
  // square.style.height = height + 'px';
  // square.style.background = color;
  // square.style.position = 'fixed';
  // square.style.top = y + 'px';
  // square.style.left = x + 'px';
  // square.style.zIndex = '0';
  // square.style.opacity = opacity;
  // square.style.pointerEvents = 'none';
  // square.addEventListener('click', e => {
  // 	scope.checkBounds(e.clientX, e.clientY, scope);
  // });
  // container.appendChild(square);
  // }
}
