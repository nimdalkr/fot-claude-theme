# fot-theme

FIVE OVER TWO(FOT) 디자인 킷 v1을 바탕으로 한 Claude 데스크톱 앱 테마 모드입니다. 라이트와 다크 두 모드를 모두 지원합니다. 다크는 검정(`#050505`) 바탕에 웜화이트(`#f7f7f4`) 글자와 FOT 레드(`#e31b23`) 포인트로, 라이트는 웜화이트 종이 위에 같은 구성으로 칠합니다. 대화 화면의 우상단에는 공식 FOT 심볼이 아주 옅게(약 9%) 비칩니다. 데스크톱 앱에서는 사이드 패널에 가려지지 않도록 오른쪽 모서리에서 안쪽으로 들여 놓았고, 모바일 앱에서는 모서리에 가깝게 둡니다.

## 설치

터미널 세션의 프롬프트에서:

```
/plugin install fot-theme --marketplace nimdalkr/fot-claude-theme
```

셸에서:

```
claude plugin install fot-theme --marketplace nimdalkr/fot-claude-theme
```

Claude 데스크톱 앱에서(`/plugin`이 동작하지 않는 곳): 프롬프트 상자 옆 **+** → **Plugins** → **Add marketplace**에 `nimdalkr/fot-claude-theme`를 넣고 → **Add plugin**.

설치하면 `Add marketplace?`에 `y`로 답하고, 범위는 사용자(user) 범위를 고릅니다. 이후 새로 여는 모든 세션에 테마가 적용됩니다.

## 디자인 토큰

`FIVE OVER TWO 디자인 킷 v1`의 `design-tokens.json`(2026-10-21) 팔레트를 그대로 사용합니다.

| 이름 | 값 | 이름 | 값 |
| --- | --- | --- | --- |
| black | `#050505` | red | `#e31b23` |
| carbon | `#0b0b0d` | signal | `#f0141e` |
| ink | `#151515` | deep | `#b80f17` |
| white (웜) | `#f7f7f4` | gray | `#717171` |
| paper | `#ffffff` | muted | `#a8a8a4` |

## 구성

- `hooks/register.tsx`: 테마 색(`makeColors`)과 배경 장면(`Backdrop`)을 `session.start`에서 설정합니다.
- `hooks/make-colors.js`, `hooks/make-colors.d.ts`: 디자인 시스템 색 이름을 만들어 주는 도우미입니다. 수정하지 않고 그대로 둡니다.
- `assets/fot-data-core-red.svg`: 킷 v1의 공식 심볼 원본입니다. 형상·비율·색을 바꾸지 않고, 배경에서는 투명도만 낮춰 씁니다.

## 조정

배경의 심볼 농도는 `hooks/register.tsx`의 `sceneAt` 안 `opacity="0.16"`과 `glass.opacity`로, 위치는 `SCENE_DESKTOP`·`SCENE_MOBILE`의 좌표로 바꿉니다.

심볼 SVG와 팔레트는 FIVE OVER TWO 디자인 킷 v1의 것이며, 이 저장소의 코드와 별도로 브랜드 사용 기준을 따릅니다.
