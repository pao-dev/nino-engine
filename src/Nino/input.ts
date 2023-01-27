
/**
 * Main Input handler module
 * @module Input
 */
class Input {
  public static mouseX: number = 0;
  public static mouseY: number = 0;
  public static onclick: boolean = false;

  public static keyMap: any = new Map();
  public static pressed: any = new Map();

  public static mouseMap: any = new Map();
  public static mousePressed: any = new Map();

  constructor() {}

  public static init(canvas: any) {
    ["keydown", "keyup"].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        Input.eventHandler(event);
      });
    });

    ["mousedown", "mouseup"].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        Input.eventHandlerMouse(event);
      });
    });

    document.addEventListener("mousemove", (event) => {
      var cRect = canvas.getBoundingClientRect();
      Input.mouseX = Math.round(event.clientX - cRect.left);
      Input.mouseY = Math.round(event.clientY - cRect.top);
    });
  }

  public static getButtonPress(key: any) {
    if (Input.keyMap.get(key) && !Input.pressed.get(key)) {
      Input.pressed.set(key, true);
      return true;
    } else return false;
  }

  public static getButton(key: any) {
    return Input.keyMap.get(key);
  }

  public static eventHandler(event: any) {
    event.preventDefault();

    const input = {
      key: event.key,
      state: event.type === "keydown" ? 1 : 0
    };

    if (Input.keyMap.get(input.key) === input.state) {
      return;
    }

    if (!input.state) {
      Input.pressed.set(input.key, false);
    }

    Input.keyMap.set(input.key, input.state);
  }

  // ? mouse
  public static getClickPress(key: any) {
    if (Input.mouseMap.get(key) && !Input.mousePressed.get(key)) {
      Input.mousePressed.set(key, true);
      return true;
    } else return false;
  }

  public static eventHandlerMouse(event: any) {
    event.preventDefault();

    const input = {
      key: "b",
      state: event.type === "mousedown" ? 1 : 0
    };

    if (Input.mouseMap.get(input.key) === input.state) {
      return;
    }

    if (!input.state) {
      Input.mousePressed.set(input.key, false);
    }

    // Asignar los valores
    Input.mouseMap.set(input.key, input.state);
  }
  public static hover(position: any, size: any) {
    return (
      position.x < Input.mouseX &&
      position.x + size > Input.mouseX &&
      position.y < Input.mouseY &&
      position.y + size > Input.mouseY
    );
  }
}

export default Input;
