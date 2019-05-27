/*

 List/index.js

*/

export default class {
  constructor() {
    this.url = window.location.origin
    this.endPoint = `${this.url}/assets/json/mock.json`
    this.table = document.querySelector('.fn-table')
    this.freeWordBox = document.querySelector('.fn-free-word')
    this.searchCheckBoxWrapper = document.querySelector('.fn-search-checkbox-wrapper')
    this.sortButton = document.querySelectorAll('.fn-sort-button')
    this.keyDictionary = {
      'provider-name': ['決済事業者'],
      'payment-method': ['利用可能な決済手段', 'ブランド'],
      'payment-timing': ['入金タイミング', '回数'],
      'payment-terminal': ['対応可能な決済端末', '提供される決済端末'],
      'settlement-fee-period': ['決済手数料', '還元実施期間中'],
      'settlement-fee-end': ['決済手数料', '還元実施期間終了後', '利率'],
      'cost-period': ['発生する費用', '還元実施期間中', '費用有無'],
      'const-end': ['発生する費用', '還元実施期間終了後', '費用有無']
    }
    this.paymentMethodDictionary = {
      電子マネー: 'electronic-money',
      クレジットカード: 'credit-card',
      その他: 'other-payment',
      QRコード: 'qr-code',
      Jデビット: 'j-debit'
    }
    this.periodPaymentRateDictionary = {
      '1.50%': 'low',
      '1.80%': 'second',
      '2.00%～3.00%': 'third',
      '2.95%': 'fourth',
      '3.00%': 'fifth',
      '3.24%': 'sixth',
      '3.25%': 'high'
    }
    this.paymentTimingDictionary = {
      '複数回/店舗毎に異なり月1回～月6回': 'multiple-every-store',
      '複数回/6回': 'multiple-six-time',
      '複数回/2回、6回': 'multiple-twice-six-time',
      '複数回/2回': 'multiple-twice',
      // prettier-ignore
      '毎週': 'every-week',
      // prettier-ignore
      '月次一括': 'monthly-summing-up',
      // prettier-ignore
      'その他': 'other-timing'
    }
    this.checkList = {
      paymentMethod: [],
      periodPaymentRate: [],
      paymentTiming: []
    }
    this.initializeData = []
    this.processingData = []
    this.processingPaymentMethodCheckBoxData = []
    this.processingPeriodPaymentCheckBoxData = []
    this.processingPaymentTimingCheckBoxData = []
    this.concatenateSearchCheckBoxData = []
    this.processingCheckBoxData = []
  }

  resolvedPromise(arg) {
    return new Promise(resolve => resolve(arg))
  }

  async getData() {
    try {
      const getData = await fetch(this.endPoint)
      this.initializeData = await getData.json()
    } catch (error) {
      console.error('error: ', error)
    }
  }

  initializeTable() {
    // '.table-data-wrapper' is Virtual DOM, Don't into Constructor.
    Array.from(document.querySelectorAll('.fn-table-data-wrapper'), tableData => tableData.remove())
  }

  initializeSortButton() {
    Array.from(this.sortButton, initialize => initialize.classList.remove('is-sort'))
  }

  /*
  Render CheckBox 決済手段.
  */
  renderPaymentMethodCheckBox() {
    const createEachCheckBoxWrapperElement = document.createElement('dl')
    createEachCheckBoxWrapperElement.classList.add('each-checkbox-wrapper')
    createEachCheckBoxWrapperElement.innerHTML = `
    <dt class="each-checkbox-heading">決済手段</dt>
    <dd class="each-checkbox-data fn-checkbox-payment-method"></dd>
    `
    if (this.searchCheckBoxWrapper) {
      this.searchCheckBoxWrapper.appendChild(createEachCheckBoxWrapperElement)
    }
    const processingAry = this.initializeData.map(info => {
      return info.利用可能な決済手段.決済手段.split('、')
    })
    const paymentMethodAry = processingAry
      .join(',')
      .split(',')
      .filter((info, index, ary) => ary.indexOf(info) === index)
      .sort((previous, current) => {
        if (previous > current) return -1
        if (previous < current) return 1
        return 0
      })
    paymentMethodAry.map(info => {
      const createEachCheckBoxElement = document.createElement('span')
      createEachCheckBoxElement.classList.add('each-checkbox')
      createEachCheckBoxElement.innerHTML = `
      <input
       type="checkbox" id="${this.paymentMethodDictionary[info]}"
       class="checkbox-input checkbox-input-payment-method fn-checkbox-input fn-checkbox-input-payment-method">
      <label for="${this.paymentMethodDictionary[info]}" class="checkbox-label">${info}</label>
      `
      if (document.querySelector('.fn-checkbox-payment-method')) {
        document.querySelector('.fn-checkbox-payment-method').appendChild(createEachCheckBoxElement)
      }
    })
  }

  /*
  Render CheckBox 手数料率（期間中）.
  */
  renderPeriodPaymentRateCheckBox() {
    const createEachCheckBoxWrapperElement = document.createElement('dl')
    createEachCheckBoxWrapperElement.classList.add('each-checkbox-wrapper')
    createEachCheckBoxWrapperElement.innerHTML = `
    <dt class="each-checkbox-heading">手数料率<br class="display-large-mobile">（期間中）</dt>
    <dd class="each-checkbox-data fn-checkbox-period-payment-rate"></dd>
    `
    if (this.searchCheckBoxWrapper) {
      this.searchCheckBoxWrapper.appendChild(createEachCheckBoxWrapperElement)
    }
    const processingAry = this.initializeData.map(info => {
      return info.決済手数料.還元実施期間中
    })
    const periodPaymentRateAry = processingAry
      .filter((info, index, ary) => ary.indexOf(info) === index)
      .sort((previous, current) => {
        if (previous < current) return -1
        if (previous > current) return 1
        return 0
      })
    periodPaymentRateAry.map(info => {
      const createEachCheckBoxElement = document.createElement('span')
      createEachCheckBoxElement.classList.add('each-checkbox')
      createEachCheckBoxElement.innerHTML = `
      <input
       type="checkbox"
       id="${this.periodPaymentRateDictionary[info]}"
       class="checkbox-input checkbox-input-period-payment-rate fn-checkbox-input fn-checkbox-input-period-payment-rate">
      <label for="${this.periodPaymentRateDictionary[info]}" class="checkbox-label">${info}</label>
      `
      if (document.querySelector('.fn-checkbox-period-payment-rate')) {
        document.querySelector('.fn-checkbox-period-payment-rate').appendChild(createEachCheckBoxElement)
      }
    })
  }

  /*
  Render CheckBox 入金タイミング.
  */
  renderPaymentTimingCheckBox() {
    const createEachCheckBoxWrapperElement = document.createElement('dl')
    createEachCheckBoxWrapperElement.classList.add('each-checkbox-wrapper')
    createEachCheckBoxWrapperElement.innerHTML = `
    <dt class="each-checkbox-heading">入金<br class="display-large-mobile">タイミング</dt>
    <dd class="each-checkbox-data fn-checkbox-payment-timing"></dd>
    `
    if (this.searchCheckBoxWrapper) {
      this.searchCheckBoxWrapper.appendChild(createEachCheckBoxWrapperElement)
    }
    const processingAry = this.initializeData.map(info => {
      return `${info.入金タイミング.項目}${info.入金タイミング.回数 === '' ? '' : `/${info.入金タイミング.回数}`}`
    })
    const paymentTimingAry = processingAry
      .filter((info, index, ary) => ary.indexOf(info) === index)
      .sort((previous, current) => {
        if (previous > current) return -1
        if (previous < current) return 1
        return 0
      })
    paymentTimingAry.map(info => {
      const createEachCheckBoxElement = document.createElement('span')
      createEachCheckBoxElement.classList.add('each-checkbox')
      createEachCheckBoxElement.innerHTML = `
      <input
       type="checkbox" id="${this.paymentTimingDictionary[info]}"
       class="checkbox-input checkbox-input-payment-timing fn-checkbox-input fn-checkbox-input-payment-timing">
      <label for="${this.paymentTimingDictionary[info]}" class="checkbox-label">${info}</label>
      `
      if (document.querySelector('.fn-checkbox-payment-timing')) {
        document.querySelector('.fn-checkbox-payment-timing').appendChild(createEachCheckBoxElement)
      }
    })
  }

  /*
  Render Data Table (Core)
  */
  render(addData) {
    if (addData.length > 0) {
      addData.map(info => {
        const createTableListElement = document.createElement('tr')
        createTableListElement.classList.add('table-data-wrapper', 'fn-table-data-wrapper')
        createTableListElement.innerHTML = `
      <td class="table-data data-heading">
        <a href="${this.url}/franchise/settlement-company-typeB-detail.html?dataID=${info.dataID}" class="link-company-detail">
        ${info.決済事業者}
        </a>
      </td>
      <td class="table-data data-payment">${info.利用可能な決済手段.決済手段}</td>
      <td class="table-data data-brand">${info.利用可能な決済手段.ブランド}</td>
      <td class="table-data data-period-rate">${info.決済手数料.還元実施期間中}</td>
      <td class="table-data data-continuation">${info.決済手数料.還元実施期間終了後.項目}<br>
        <small class="data-note">${info.決済手数料.還元実施期間終了後.注釈}</small>
      </td>
      <td class="table-data data-end-rate ${info.決済手数料.還元実施期間終了後.利率 === 'ー' ? 'is-none' : ''}">
        ${info.決済手数料.還元実施期間終了後.利率}
      </td>
      <td class="table-data data-timing">${info.入金タイミング.項目}</td>
      <td class="table-data data-count ${info.入金タイミング.回数 === 'ー' ? 'is-none' : ''}">
        ${info.入金タイミング.回数}
      </td>
      <td class="table-data data-period-cost">${info.発生する費用.還元実施期間中.費用有無}</td>
      <td class="table-data data-end-cost">${info.発生する費用.還元実施期間終了後.費用有無}</td>
      <td class="table-data data-terminal-type">${info.対応可能な決済端末.提供される決済端末}<br>
        ${info.対応可能な決済端末.注釈}
      </td>
    `
        if (this.table) {
          this.table.appendChild(createTableListElement)
        }
      })
    } else {
      const createTableListElement = document.createElement('tr')
      createTableListElement.classList.add('table-data-wrapper', 'fn-table-data-wrapper')
      createTableListElement.innerHTML = `
    <td colspan="11" class="table-data data-no-data">
       該当データが有りません。
    </td>
  `
      if (this.table) {
        this.table.appendChild(createTableListElement)
      }
    }
  }

  /*
  Search CheckBox Core.
  */
  searchCheckBox() {
    this.concatenateSearchCheckBoxData = [
      this.processingPaymentMethodCheckBoxData,
      this.processingPeriodPaymentCheckBoxData,
      this.processingPaymentTimingCheckBoxData
    ]
    this.processingCheckBoxData = this.concatenateSearchCheckBoxData.reduce((accumulator, current) => {
      return [...accumulator, ...current].filter((info, index, array) => {
        return array.indexOf(info) === index && index !== array.lastIndexOf(info)
      })
    }, this.initializeData)
    this.processingData = this.processingCheckBoxData
    this.initializeSortButton()
    this.initializeTable()
    this.render(this.processingData)
  }

  /*
  Searching CheckBox 決済手段.
  */
  searchPaymentMethodCheckBox() {
    const checkBoxPaymentMethodSelectors = document.querySelectorAll('.fn-checkbox-input-payment-method')
    if (this.searchCheckBoxWrapper) {
      this.processingPaymentMethodCheckBoxData = this.initializeData
      Array.from(checkBoxPaymentMethodSelectors, selector => {
        selector.addEventListener('change', () => {
          this.checkList.paymentMethod = []
          Array.from(checkBoxPaymentMethodSelectors)
            .filter(checkSelector => {
              if (checkSelector.checked) return checkSelector
            })
            .map(activeCheckBox => {
              Object.keys(this.paymentMethodDictionary).filter(keyInfo => {
                if (this.paymentMethodDictionary[keyInfo] === activeCheckBox.id) {
                  this.checkList.paymentMethod.push(keyInfo)
                }
              })
            })
          this.processingPaymentMethodCheckBoxData = this.initializeData.filter(dataInfo => {
            if (this.checkList.paymentMethod.length === 0) {
              return dataInfo
            }
            for (let i = 0; i < this.checkList.paymentMethod.length; i++) {
              if (dataInfo.利用可能な決済手段.決済手段.includes(this.checkList.paymentMethod[i])) {
                return dataInfo
              }
            }
          })
          this.searchCheckBox()
        })
      })
    }
  }

  searchPeriodPaymentRateCheckBox() {
    const checkBoxPeriodPaymentRateSelectors = document.querySelectorAll('.fn-checkbox-input-period-payment-rate')
    if (this.searchCheckBoxWrapper) {
      this.processingPeriodPaymentCheckBoxData = this.initializeData
      Array.from(checkBoxPeriodPaymentRateSelectors, selector => {
        selector.addEventListener('change', () => {
          this.checkList.periodPaymentRate = []
          Array.from(checkBoxPeriodPaymentRateSelectors)
            .filter(checkSelector => {
              if (checkSelector.checked) return checkSelector
            })
            .map(activeCheckBox => {
              Object.keys(this.periodPaymentRateDictionary).filter(keyInfo => {
                if (this.periodPaymentRateDictionary[keyInfo] === activeCheckBox.id) {
                  this.checkList.periodPaymentRate.push(keyInfo)
                }
              })
            })
          this.processingPeriodPaymentCheckBoxData = this.initializeData.filter(dataInfo => {
            if (this.checkList.periodPaymentRate.length === 0) {
              return dataInfo
            }
            for (let i = 0; i < this.checkList.periodPaymentRate.length; i++) {
              if (dataInfo.決済手数料.還元実施期間中 === this.checkList.periodPaymentRate[i]) {
                return dataInfo
              }
            }
          })
          this.searchCheckBox()
        })
      })
    }
  }

  searchPaymentTimingCheckBox() {
    const checkBoxPaymentTimingSelectors = document.querySelectorAll('.fn-checkbox-input-payment-timing')
    if (this.searchCheckBoxWrapper) {
      this.processingPaymentTimingCheckBoxData = this.initializeData
      Array.from(checkBoxPaymentTimingSelectors, selector => {
        selector.addEventListener('change', () => {
          this.checkList.paymentTiming = []
          Array.from(checkBoxPaymentTimingSelectors)
            .filter(checkSelector => {
              if (checkSelector.checked) return checkSelector
            })
            .map(activeCheckBox => {
              Object.keys(this.paymentTimingDictionary).filter(keyInfo => {
                if (this.paymentTimingDictionary[keyInfo] === activeCheckBox.id) {
                  this.checkList.paymentTiming.push(keyInfo)
                }
              })
            })
          this.processingPaymentTimingCheckBoxData = this.initializeData.filter(dataInfo => {
            if (this.checkList.paymentTiming.length === 0) {
              return dataInfo
            }
            for (let i = 0; i < this.checkList.paymentTiming.length; i++) {
              if (this.checkList.paymentTiming[i].indexOf('/') > -1) {
                const valueItems = this.checkList.paymentTiming[i].slice(0, this.checkList.paymentTiming[i].indexOf('/'))
                const valueTimes = this.checkList.paymentTiming[i].slice(
                  this.checkList.paymentTiming[i].indexOf('/') + 1,
                  this.checkList.paymentTiming[i].length
                )
                if (dataInfo.入金タイミング.項目 === valueItems && dataInfo.入金タイミング.回数 === valueTimes) {
                  return dataInfo
                }
              } else {
                if (dataInfo.入金タイミング.項目 === this.checkList.paymentTiming[i]) {
                  return dataInfo
                }
              }
            }
          })
          this.searchCheckBox()
        })
      })
    }
  }

  searchFreeWord() {
    if (this.freeWordBox) {
      this.freeWordBox.addEventListener('keyup', event => {
        const getValue = event.currentTarget.value.toLowerCase()
        /*
        ページ読み込み後、チェックボックス検索を1度もせずに、
        フリーワード検索をする場合は、'this.initializeData'から検索。
        チェックボックス検索発動後は、'this.processingCheckBoxData'から検索。
        */
        this.processingData = (this.processingCheckBoxData.length > 0 ? this.processingCheckBoxData : this.initializeData).filter(info => {
          if (
            info.決済事業者.toLowerCase().includes(getValue) ||
            info.利用可能な決済手段.決済手段.toLowerCase().includes(getValue) ||
            info.利用可能な決済手段.ブランド.toLowerCase().includes(getValue) ||
            info.決済手数料.還元実施期間中.toLowerCase().includes(getValue) ||
            info.決済手数料.還元実施期間終了後.項目.toLowerCase().includes(getValue) ||
            info.決済手数料.還元実施期間終了後.注釈.toLowerCase().includes(getValue) ||
            info.決済手数料.還元実施期間終了後.利率.toLowerCase().includes(getValue) ||
            info.入金タイミング.項目.toLowerCase().includes(getValue) ||
            info.入金タイミング.回数.toLowerCase().includes(getValue) ||
            info.発生する費用.還元実施期間中.費用有無.toLowerCase().includes(getValue) ||
            info.発生する費用.還元実施期間終了後.費用有無.toLowerCase().includes(getValue) ||
            info.対応可能な決済端末.提供される決済端末.toLowerCase().includes(getValue) ||
            info.対応可能な決済端末.注釈.toLowerCase().includes(getValue)
          ) {
            return info
          }
        })
        this.initializeSortButton()
        this.initializeTable()
        this.render(this.processingData)
      })
    }
  }

  sortByAscending(getKey) {
    ;(this.processingData.length > 0 ? this.processingData : this.initializeData).sort((previous, current) => {
      let _previous = previous
      let _current = current
      getKey.map(info => (_previous = _previous[info]))
      getKey.map(info => (_current = _current[info]))
      if (_previous < _current) return -1
      if (_previous > _current) return 1
      return 0
    })
    this.render(this.processingData.length > 0 ? this.processingData : this.initializeData)
  }

  sortByDescending(getKey) {
    ;(this.processingData.length > 0 ? this.processingData : this.initializeData).sort((previous, current) => {
      let _previous = previous
      let _current = current
      getKey.map(info => (_previous = _previous[info]))
      getKey.map(info => (_current = _current[info]))
      if (_previous > _current) return -1
      if (_previous < _current) return 1
      return 0
    })
    this.render(this.processingData.length > 0 ? this.processingData : this.initializeData)
  }

  sortData() {
    Array.from(this.sortButton, selector => {
      selector.addEventListener('click', event => {
        this.initializeTable()
        if (!event.currentTarget.classList.contains('is-sort')) {
          this.initializeSortButton()
          event.currentTarget.classList.add('is-sort')
          this.sortByDescending(this.keyDictionary[event.currentTarget.dataset.key])
        } else {
          event.currentTarget.classList.remove('is-sort')
          this.sortByAscending(this.keyDictionary[event.currentTarget.dataset.key])
        }
      })
    })
  }

  async core() {
    await this.resolvedPromise(this.getData())
    this.renderPaymentMethodCheckBox()
    this.renderPeriodPaymentRateCheckBox()
    this.renderPaymentTimingCheckBox()
    this.render(this.initializeData)
    this.searchPaymentMethodCheckBox()
    this.searchPeriodPaymentRateCheckBox()
    this.searchPaymentTimingCheckBox()
    this.searchFreeWord()
    this.sortData()
  }
}
