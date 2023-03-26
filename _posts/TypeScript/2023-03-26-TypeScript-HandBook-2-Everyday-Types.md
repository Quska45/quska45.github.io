---
layout: post
title: "TypeScript HandBook 2.Everyday-Types"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-26
background: '/img/posts/06.jpg'
---

### 여러가지 타입
기본타입에 대한 내용들이 많습니다.
원문을 참고해주세요.

### 유니언 타입
기존의 타입을 기반으로 다양한 연산자를 사용하여 새로운 타입을 만들 수 있습니다.
타입들을 조합하여 흥미로운 방식으로 사용할 수 있습니다.

#### 유니언 타입 정의하기
타입을 조합하는 첫 번째 방법을 유니언 타입을 사용하는 것입니다.
서로 다른 두 개 이상의 타입을 사용해 만드는 것으로, 이 타입의 값은 조합에 사용된 타입 중 하나를 가질 수 있습니다.
조합에 사용된 각 타입은 유니언 타입의 멤버라고 부릅니다.

```javascript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// 오류
printId({ myID: 22342 });
```

#### 유니언 타입 사용하기
유니언 타입에 맞는 값을 제공하는 것은 간단합니다.
하지만 사용하는 것은 생각해볼 점이 있습니다.
만약 <strong>string | number</strong> 이라는 유니언 타입인 경우, string 타입에만 유효한 메서드는 사용할 수 없습니다.

```javascripot
function printId(id: number | string) {
  console.log(id.toUpperCase()); // error 발생
}
```

이를 해결하려면 코드상에서 유니언을 좁혀야 하는데, 이는 타입 표기가 없는 자바스크립트에서 벌어지는 일과 동일합니다.
이런경우엔 타입을 좁히는 방법이 필요하고 예시는 다음과 같습니다.

```javascript
function printId(id: number | string) {
  if (typeof id === "string") {
    // 이 분기에서 id는 'string' 타입을 가집니다
 
    console.log(id.toUpperCase());
  } else {
    // 여기에서 id는 'number' 타입을 가집니다
    console.log(id);
  }
}
```

### 타입 별칭
특정 타입을 미리 정의해놓고 사용하는 것을 의미합니다.
타입을 위한 이름을 제공하고 이를 사용할 수 있도록 합니다.
```javascript
type Point = {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

### 인터페이스
객체 타입을 만드는 또 다른 방법입니다.
```javascript
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

#### 타입 별칭과 인터페이스의 차이점
타입 별칭과 인터페이스는 매우 유사하며, 대부분의 경우 둘 중 하나를 자유롭게 선택하여 사용할 수 있습니다.
interface가 가지는 대부분의 기능은 type에서도 동일하게 사용 가능 합니다.
이 둘의 가장 핵심적인 차이는, 타입은 새 프로퍼티를 추가하도록 개방될 수 없는 반면, 인터페이스의 경우 확장이 가능하다는 점입니다.
그렇다고 type을 확장하는 방법이 전혀 없는 것은 아닙니다. 확장의 의미를 어떻게 보느냐에 따라 가능할 수도 불가능 할 수도 있습니다.
다음의 예시를 보겠습니다.

```javascript
// interface 확장
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear()
bear.name
bear.honey

// type 확장
type Animal = {
  name: string
}

type Bear = Animal & {
  honey: Boolean
}

const bear = getBear();
bear.name;
bear.honey;
```

```javascript
// interface 필드 추가
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

// type 필드 추가
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

 // Error: Duplicate identifier 'Window'.
```
위의 내용은 앞으로 더 다루기 때문에 우선적으로 interface를 권장한다는 것을 알아두시면 좋을 것 같습니다.

### 타입 단언
코드에서 반드시 특정 타입이 반환 된다면 이것을 미리 정의할 수 있습니다.

```javascript
// 아래의 두 가지 방식은 동일한 기능입니다.
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

타입단언에서 string을 number로 단언하는 것과 같은 불가능한 강제 변환은 불가능 합니다.
필요하다면 타입 단언을 여러번 사용할 수도 있습니다.
```javascript
const a = (expr as any) as T;
```

### 리터럴 타입
구체적인 문자열과 숫자 값을 타입 위치에 지정하는 것을 말합니다.

```javascript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre"); // error 발생
```
리터럴 타입을 이용해 정의된 값 이외의 값은 위와 같이 에러를 발생 시킵니다.


#### 리터럴 추론
아래 코드의 obj.counter는 number 타입으로 추론 됩니다.
```javascript
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```
선언 단계에서 특정 리터럴 값을 할당 받으면 타입이 추론된다는 것을 알 수 있습니다.
그럼 다음으로는 될 것 같은데 안되는 예시를 보겠습니다.

```javascript
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method); // error 발생. string은 "GET" | "POST"가 아닙니다.
```

위와 같은 예외가 발생하는 이유는 handleRequest의 2번째 인자가 GET, POST와 같은 리터럴 타입으로 지정되어 있기 때문입니다.
인자로 받은 req.method의 값은 단순한 string 값으로 추론될 뿐 "GET"이라는 값으로 추론 될 수 없기 때문에 타입스크립트는 예외를 발생시킵니다.
따라서 다음의 방법으로 우리가 원하는 타입추론을 가능하게 할 수 있습니다.

```javascript
// 수정 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// 수정 2
handleRequest(req.url, req.method as "GET");
// 수정 3
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

3번이 가능한 이유는 해당 객체의 모든 프로퍼티에 리터럴 타입의 값이 대입되도록 보장하기 때문입니다.

### null과 undefined


---
## 참고
- [TypeScript HandBook : Everyday Types](https://www.typescriptlang.org/ko/docs/handbook/2/everydat-types.html){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
