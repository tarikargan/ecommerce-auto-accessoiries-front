/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito-light':       ['Nunito-Light'   ,'Cairo-Light'],
        'nunito-regular':     ['Nunito-Regular' ,'Cairo-Regular'],
        'nunito-medium':      ['Nunito-Medium'  ,'Cairo-Medium'],
        'nunito-semiBold':    ['Nunito-semiBold','Cairo-semiBold'],
        'nunito-bold':        ['Nunito-Bold'    ,'Cairo-Bold'],
        'play-regular':       ['Play-Regular' ,'Cairo-Regular'],
        'play-bold':          ['Play-Bold'    ,'Cairo-Bold'],
      },
      colors: {
        'yellowPr'                  : '#F2BB05',
        'bluePr'                    : '#124E78',
        'greenPr'                   : '#7FD98E',
        'file-color'                : 'rgba(16, 163, 41, 0.63)',
        'donneeActivite-color'      : 'rgb(23, 65, 211)',
        'border-gray'               : '#D1E7D2',
        'cardBilan-bg'              : 'rgba(247, 251, 248, 1)',
        'valide_bg'                 : '#52CF84',

        'titleColor'                : '#313B97',
        'textColor'                 : '#677A8A',
        'inputBorder'               : '#D8DFE7',

        'updateBg'                  : '#FF6C2F',
        'saveBg'                    : '#3742F4',


        // secteur d'activite colors

        'aeronautique'              : '#777BEF', //'#000F89',
        'agroalimentaire'           : '#BAEDBD', //'#FF9800',
        'automobile'                : '#555BDA', //'#2F2C2C',
        'chimieParachimie'          : '#D8B6FF', //'#FFEB3B',
        'materiauxConstruction'     : '#0CAD73', //'#CDDC39',
        'cuir'                      : '#1C1C1C', //'#795548',
        'electriqueElectronique'    : '#14B8A6', //'#607D8B',
        'energieRenouvelable'       : '#AC75EC', //'#3F51B5',
        'ferroviaire'               : '#B5EE7D', //'#F44336',
        'industriesMetall'          : '#A7AAFF', //'#009688',
        'constructionNavale'        : '#5250A1', //'#FF5722',
        'pharmaceutique'            : '#CBCDFF', //'#2196F3',
        'plasturgie'                : '#404542', //'#4CAF50',
        'poidslourds'               : '#7BB74C', //'#E91E63',
        'textileHabillement'        : '#7FCDC8', //'#9C27B0',
        'valorisationDchets'        : '#6060FF', //'#00BCD4',
        'autresIndustries:'         : '#AD92FA', //'#FFC107',

        // status of poste d'emission
        'cloture'                   : '#2912B7',
        'encours'                   : '#F0CA00',
        'valide'                    : '#12B76A',

      },

      borderRadius: theme => ({
        ...theme.borderRadius,
        'medium': '8px'
      }),

      animation: {
        'spin-reverse': 'wiggle 1.2s linear infinite',
      },

      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        }
      }
    },
  },
  plugins: [],
}

