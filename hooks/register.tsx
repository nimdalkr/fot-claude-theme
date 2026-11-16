import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// FIVE OVER TWO 디자인 킷 v1 (design-tokens.json, 2026-10-21)의 팔레트를 그대로 쓴다.
//   black  #050505   carbon #0b0b0d   ink   #151515   darkline #29292c
//   white  #f7f7f4   paper  #ffffff   line  #e1e0db
//   red    #e31b23   signal #f0141e   deep  #b80f17
//   gray   #717171   muted  #a8a8a4
// 다크는 킷의 기본 얼굴(검정 바탕 + 웜화이트 글자 + 빨강 포인트), 라이트는 웜화이트 종이 위의 같은 구성이다.
const { theme, problems } = makeColors({
  label: 'FOT',
  roles: {
    accent: '#e31b23', // FOT red
    danger: '#b80f17', // FOT deep red: 포인트 레드와 구분되는 경고용 짙은 레드
    success: '#2f8f55',
    warning: '#c98a12',
    pro: '#6a5acd',
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#f7f7f4', // white (웜화이트)
        'surface-1': '#fbfbf9',
        'surface-2': '#ffffff', // paper
        'surface-3': '#ffffff',
        'text-primary': '#151515', // ink
        'text-secondary': '#3f3f41',
        'text-muted': '#6b6b68',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#050505', // black
        'surface-1': '#0b0b0d', // carbon
        'surface-2': '#151515', // ink
        'surface-3': '#1d1d20', // darkline 쪽으로 한 단계
        'text-primary': '#f7f7f4', // white
        'text-secondary': '#cdcdc8',
        'text-muted': '#a8a8a4', // muted
      },
    },
  },
})

// 공식 심볼 fot-data-core-red.svg (logos/svg, 킷 v1)의 경로 4개. 형상·비율·색은 원본 그대로이고,
// 배경에서는 투명도만 낮춘다. 원본은 assets/에 보관한다.
const CORE_PATHS =
  '<g transform="translate(-335,0)" fill="#F0141E" fill-rule="evenodd">' +
  '<path d="M 345.00,96.00 L 399.00,96.00 L 399.00,90.00 L 417.00,72.00 L 430.00,72.00 L 430.00,20.00 L 379.00,20.00 L 345.00,54.00 L 345.00,96.00 Z"/>' +
  '<path d="M 345.00,186.00 L 379.00,220.00 L 430.00,220.00 L 430.00,168.00 L 417.00,168.00 L 399.00,150.00 L 399.00,144.00 L 345.00,144.00 L 345.00,186.00 Z"/>' +
  '<path d="M 531.00,220.00 L 565.00,186.00 L 565.00,144.00 L 511.00,144.00 L 511.00,150.00 L 493.00,168.00 L 480.00,168.00 L 480.00,220.00 L 531.00,220.00 Z"/>' +
  '<path d="M 565.00,54.00 L 531.00,20.00 L 480.00,20.00 L 480.00,72.00 L 493.00,72.00 L 511.00,90.00 L 511.00,96.00 L 565.00,96.00 L 565.00,54.00 Z"/>' +
  '</g>'

// 우상단 쪽에 앉힌 심볼. 바깥 viewBox(1600x1000)를 xMaxYMin slice로 창의 오른쪽 위 모서리에
// 맞춰 덮으므로, 창 모양이 어떻든 심볼은 오른쪽 위 모서리에서 같은 간격만큼 떨어진 자리에 놓이고
// 비율도 변하지 않는다(잘리는 것은 왼쪽·아래뿐).
// 데스크톱은 이 장면을 창 전체 아래에 그리고, 그 위에 오른쪽 사이드 패널(환경·컨텍스트, 약 230~320px)과
// 왼쪽 사이드바가 얹히므로 모서리에 붙이면 패널에 가려진다. 그래서 오른쪽에서 400만큼 안쪽으로 들인다.
// 모바일에는 사이드 패널이 없으므로 모서리에 가깝게 둔다.
// 데스크톱은 장면을 프레임 처리된 패널 아래에 그리므로 패널을 거쳐 비치는 농도는
// 심볼 불투명도 x (1 - glass.opacity)다. 0.16 x 0.55 = 약 9%.
const sceneAt = (x: number, y: number, size: number): string =>
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMaxYMin slice">' +
  `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 240 240">` +
  `<g opacity="0.16">${CORE_PATHS}</g>` +
  '</svg>' +
  '</svg>'

const SCENE_DESKTOP = sceneAt(940, 60, 260) // 오른쪽에서 400 안쪽, 위에서 60
const SCENE_MOBILE = sceneAt(1260, 40, 300) // 오른쪽에서 40, 위에서 40

const LOOK: ThemeSetArgs = {
  colors: theme,
  // 패널이 심볼을 비치도록 유리 효과는 약하게(blur 작게, opacity 낮게) 둔다. 글자 가독성은 패널 색이 지킨다.
  backdrop: { scene: 'fot-core', glass: { blur: 2, opacity: 0.45 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    // 만드는 동안: Desktop이 테마 전체를 무시하게 되는 경고만 토스트로 알린다.
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.props.scene !== 'fot-core' || (e.surface !== 'desktop' && e.surface !== 'mobile')) {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return (
      <Svg
        source={e.surface === 'desktop' ? SCENE_DESKTOP : SCENE_MOBILE}
        alt="FIVE OVER TWO symbol, faint, in the upper right"
      />
    )
  })
}
