/*

 Detail/index.js

*/

export default class {
  constructor() {
    this.url = window.location.origin
    this.parameter = window.location.search
    this.searchWord = '?dataID='
    this.endPoint = `${this.url}/assets/json/mock.json`
    this.data = []
    this.ID = null
    this.selectors = {
      component: document.querySelector('.fn-components-settlement-company-detail'),
      heading: document.querySelector('.fn-heading03')
    }
  }

  resolvedPromise(arg) {
    return new Promise(resolve => resolve(arg))
  }

  async getData() {
    try {
      const getData = await fetch(this.endPoint)
      this.data = await getData.json()
    } catch (error) {
      console.error('error: ', error)
    }
  }

  getID() {
    this.ID = Number(this.parameter.replace(this.searchWord, ''))
  }

  render() {
    this.data.map(info => {
      if (info.dataID === this.ID) {
        info.個票.map(eachDataInfo => {
          this.selectors.heading.textContent = info.決済事業者
          const createCompanyDetailElement = document.createElement('div')
          createCompanyDetailElement.classList.add('company-detail')
          // prettier-ignore
          createCompanyDetailElement.innerHTML = `
          <div class="company-detail-heading">
            <h4 class="heading04">${eachDataInfo.個票タイトル}</h4>
            <div class="company-detail-contact">
              <dl class="each-detail-contact">
                <dt class="detail-contact-heading">お問い合わせ窓口&nbsp;&nbsp;TEL：</dt>
                <dd class="detail-contact-letter">${eachDataInfo.問い合わせ窓口TEL}</dd>
              </dl>
              <dl class="each-detail-contact">
                <dt class="detail-contact-heading">MAIL：</dt>
                <dd class="detail-contact-letter">${eachDataInfo.問い合わせ窓口MAIL}</dd>
              </dl>
              <dl class="each-detail-contact">
                <dt class="detail-contact-heading">対応可能時間：</dt>
                <dd class="detail-contact-letter">${eachDataInfo.対応可能時間}</dd>
              </dl>
            </div>
          </div>

          <div class="grid-container">

            <table class="detail-table table-first">
              <tr class="table-heading-wrapper">
                <th colspan="2" class="table-primary-heading">決済手数料</th>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-secondary-heading">還元実施期間中<br>
                （10月〜6月）</td>
                <td class="table-data">${eachDataInfo.決済手数料.還元実施期間中}</td>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-secondary-heading">還元期間終了後<br>
                （7月以降）</td>
                <td class="table-data">
                  <span class="table-data-letter">${eachDataInfo.決済手数料.期間終了後.項目}</span><br>
                  <span class="table-data-letter">${eachDataInfo.決済手数料.期間終了後.注釈}</span>
                </td>
              </tr>
            </table>

            <table class="detail-table table-second">
              <tr class="table-data-wrapper">
              <th class="table-secondary-heading">還元実施期間前<br>
                ※新規の場合<br>
                （4月〜9月）</th>
                <td class="table-data">${eachDataInfo.決済手数料.還元実施期間前}</td>
                </tr>
            </table>

            <table class="detail-table table-third">
              <tr class="table-heading-wrapper">
                <th colspan="2" class="table-primary-heading">入金のタイミング</th>
              </tr>
              <tr class="table-data-wrapper">
                <td colspan="2" class="table-data">${eachDataInfo.入金タイミング.項目}</td>
              </tr>
              <tr class="table-data-wrapper">
                <th class="table-secondary-heading">締日</th>
                <td class="table-data">${eachDataInfo.入金タイミング.締日}</td>
              </tr>
              <tr class="table-data-wrapper">
                <th class="table-secondary-heading">支払日</th>
                <td class="table-data">${eachDataInfo.入金タイミング.支払日}</td>
              </tr>
              <tr class="table-data-wrapper">
                <th class="table-secondary-heading">振込手数料</th>
                <td class="table-data">${eachDataInfo.入金タイミング.振込手数料}</td>
              </tr>
            </table>

            <table class="detail-table table-fourth">
              <tr class="table-heading-wrapper">
                <th colspan="2" class="table-primary-heading">期間中に追加的に発生する費用</th>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-data data-period-cost">${eachDataInfo.発生する費用.期間中.費目1}</td>
                <td class="table-data data-period-cost">${eachDataInfo.発生する費用.期間中.費目2}</td>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-data data-period-cost">${eachDataInfo.発生する費用.期間中.費目3}</td>
                <td class="table-data data-period-cost">${eachDataInfo.発生する費用.期間中.費目4}</td>
              </tr>
            </table>

            <table class="detail-table table-fifth">
              <tr class="table-heading-wrapper">
                <th colspan="2" class="table-primary-heading">期間終了後に発生する費用</th>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-data data-period-cost">${eachDataInfo.発生する費用.期間終了後.費目1}</td>
                <td class="table-data data-period-cost">${eachDataInfo.発生する費用.期間終了後.費目2}</td>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-data data-period-cost">${eachDataInfo.発生する費用.期間終了後.費目3}</td>
                <td class="table-data data-period-cost">${eachDataInfo.発生する費用.期間終了後.費目4}</td>
              </tr>
            </table>

            <table class="detail-table table-sixth">
              <tr class="table-heading-wrapper">
                <th class="table-primary-heading">対応可能なブランド/サービス</th>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-data data-payment-detail">
                  <dl class="payment-detail-wrapper payment-credit-wrapper">
                    <dt class="payment-detail-heading payment-credit-heading ${eachDataInfo.対応可能なブランド.クレジットカード.length === 0 ? 'is-inactive' : ''}">クレジットカード</dt>
                    <dd class="payment-detail-data">${eachDataInfo.対応可能なブランド.クレジットカード.map((creditInfo, creditIndex) => creditIndex + 1 < eachDataInfo.対応可能なブランド.クレジットカード.length ? `${creditInfo}・` : `${creditInfo}`).toString().replace(/,/g, '')}</dd>
                  </dl>
                  <dl class="payment-detail-wrapper payment-electronic-money-wrapper">
                    <dt class="payment-detail-heading payment-electronic-money-heading ${eachDataInfo.対応可能なブランド.電子マネー.length === 0 ? 'is-inactive' : ''}">電子マネー</dt>
                    <dd class="payment-detail-data">${eachDataInfo.対応可能なブランド.電子マネー.map((electronicMoneyInfo, electronicMoneyIndex) => electronicMoneyIndex + 1 < eachDataInfo.対応可能なブランド.電子マネー.length ? `${electronicMoneyInfo}・` : `${electronicMoneyInfo}`).toString().replace(/,/g, '')}</dd>
                  </dl>
                  <dl class="payment-detail-wrapper payment-qr-wrapper">
                    <dt class="payment-detail-heading payment-qr-heading ${eachDataInfo.対応可能なブランド.QRコード.length === 0 ? 'is-inactive' : ''}">QRコード</dt>
                    <dd class="payment-detail-data">${eachDataInfo.対応可能なブランド.QRコード.map((QRInfo, QRIndex) => QRIndex + 1 < eachDataInfo.対応可能なブランド.QRコード.length ? `${QRInfo}・` : `${QRInfo}`).toString().replace(/,/g, '')}</dd>
                  </dl>
                  <dl class="payment-detail-wrapper payment-other-wrapper">
                    <dt class="payment-detail-heading payment-other-heading ${eachDataInfo.対応可能なブランド.その他.length === 0 ? 'is-inactive' : ''}">その他</dt>
                    <dd class="payment-detail-data">${eachDataInfo.対応可能なブランド.その他.map((otherInfo, otherIndex) => otherIndex + 1 < eachDataInfo.対応可能なブランド.その他.length ? `${otherInfo}・` : `${otherInfo}`).toString().replace(/,/g, '')}</</dd>
                  </dl>
                </td>
              </tr>
            </table>

            <table class="detail-table table-seventh">
              <tr class="table-heading-wrapper">
                <th class="table-primary-heading">サービスURL</th>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-data"><a href="${eachDataInfo.サービスURL}" target="_blank" class="table-data-link">${eachDataInfo.サービスURL}</a></td>
              </tr>
            </table>

            <table class="detail-table table-eighth">
              <tr class="table-heading-wrapper">
                <th class="table-primary-heading">備考</th>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-data">${eachDataInfo.備考}</td>
              </tr>
            </table>

            <table class="detail-table table-ninth">
              <tr class="table-heading-wrapper">
                <th class="table-primary-heading">サービス提供エリア</th>
              </tr>
              <tr class="table-data-wrapper data-map-wrapper">
                <td class="table-data data-map">
                  <ul class="prefectly plain">
                    <li data-pref="ac" class="ac map-area map-aichi ${eachDataInfo.サービス提供エリア.includes('愛知県') ? 'is-active' : ''}">A</li>
                    <li data-pref="am" class="am map-area map-aomori ${eachDataInfo.サービス提供エリア.includes('青森県') ? 'is-active' : ''}">B</li>
                    <li data-pref="at" class="at map-area map-akita ${eachDataInfo.サービス提供エリア.includes('秋田県') ? 'is-active' : ''}">C</li>
                    <li data-pref="cb" class="cb map-area map-chiba ${eachDataInfo.サービス提供エリア.includes('千葉県') ? 'is-active' : ''}">D</li>
                    <li data-pref="eh" class="eh map-area map-ehime ${eachDataInfo.サービス提供エリア.includes('愛媛県') ? 'is-active' : ''}">E</li>
                    <li data-pref="fk" class="fk map-area map-fukui ${eachDataInfo.サービス提供エリア.includes('福井県') ? 'is-active' : ''}">F</li>
                    <li data-pref="fo" class="fo map-area map-fukuoka ${eachDataInfo.サービス提供エリア.includes('福岡県') ? 'is-active' : ''}">G</li>
                    <li data-pref="fs" class="fs map-area map-fukushima ${eachDataInfo.サービス提供エリア.includes('福島県') ? 'is-active' : ''}">H</li>
                    <li data-pref="gf" class="gf map-area map-gifu ${eachDataInfo.サービス提供エリア.includes('岐阜県') ? 'is-active' : ''}">I</li>
                    <li data-pref="gm" class="gm map-area map-gunma ${eachDataInfo.サービス提供エリア.includes('群馬県') ? 'is-active' : ''}">J</li>
                    <li data-pref="hg" class="hg map-area map-hyogo ${eachDataInfo.サービス提供エリア.includes('兵庫県') ? 'is-active' : ''}">K</li>
                    <li data-pref="hk" class="hk map-area map-hokkaido ${eachDataInfo.サービス提供エリア.includes('北海道') ? 'is-active' : ''}">L</li>
                    <li data-pref="hs" class="hs map-area map-hiroshima ${eachDataInfo.サービス提供エリア.includes('広島県') ? 'is-active' : ''}">M</li>
                    <li data-pref="ig" class="ig map-area map-ibaraki ${eachDataInfo.サービス提供エリア.includes('茨城県') ? 'is-active' : ''}">N</li>
                    <li data-pref="ik" class="ik map-area map-ishikawa ${eachDataInfo.サービス提供エリア.includes('石川県') ? 'is-active' : ''}">O</li>
                    <li data-pref="it" class="it map-area map-iwate ${eachDataInfo.サービス提供エリア.includes('岩手県') ? 'is-active' : ''}">P</li>
                    <li data-pref="ka" class="ka map-area map-kagawa ${eachDataInfo.サービス提供エリア.includes('香川県') ? 'is-active' : ''}">Q</li>
                    <li data-pref="kg" class="kg map-area map-kagoshima ${eachDataInfo.サービス提供エリア.includes('鹿児島県') ? 'is-active' : ''}">R</li>
                    <li data-pref="km" class="km map-area map-kumamoto ${eachDataInfo.サービス提供エリア.includes('熊本県') ? 'is-active' : ''}">S</li>
                    <li data-pref="kn" class="kn map-area map-kanagawa ${eachDataInfo.サービス提供エリア.includes('神奈川県') ? 'is-active' : ''}">T</li>
                    <li data-pref="ko" class="ko map-area map-kochi ${eachDataInfo.サービス提供エリア.includes('高知県') ? 'is-active' : ''}">U</li>
                    <li data-pref="kt" class="kt map-area map-kyoto ${eachDataInfo.サービス提供エリア.includes('京都府') ? 'is-active' : ''}">V</li>
                    <li data-pref="me" class="me map-area map-mie ${eachDataInfo.サービス提供エリア.includes('三重県') ? 'is-active' : ''}">W</li>
                    <li data-pref="mg" class="mg map-area map-miyagi ${eachDataInfo.サービス提供エリア.includes('宮城県') ? 'is-active' : ''}">X</li>
                    <li data-pref="mz" class="mz map-area map-miyazaki ${eachDataInfo.サービス提供エリア.includes('宮崎県') ? 'is-active' : ''}">Y</li>
                    <li data-pref="ng" class="ng map-area map-niigata ${eachDataInfo.サービス提供エリア.includes('新潟県') ? 'is-active' : ''}">Z</li>
                    <li data-pref="nn" class="nn map-area map-nagano ${eachDataInfo.サービス提供エリア.includes('長野県') ? 'is-active' : ''}">a</li>
                    <li data-pref="nr" class="nr map-area map-nara ${eachDataInfo.サービス提供エリア.includes('奈良県') ? 'is-active' : ''}">b</li>
                    <li data-pref="ns" class="ns map-area map-nagasaki ${eachDataInfo.サービス提供エリア.includes('長崎県') ? 'is-active' : ''}">c</li>
                    <li data-pref="on" class="on map-area map-okinawa ${eachDataInfo.サービス提供エリア.includes('沖縄県') ? 'is-active' : ''}">d</li>
                    <li data-pref="os" class="os map-area map-osaka ${eachDataInfo.サービス提供エリア.includes('大阪府') ? 'is-active' : ''}">e</li>
                    <li data-pref="ot" class="ot map-area map-oita ${eachDataInfo.サービス提供エリア.includes('大分県') ? 'is-active' : ''}">f</li>
                    <li data-pref="oy" class="oy map-area map-okayama ${eachDataInfo.サービス提供エリア.includes('岡山県') ? 'is-active' : ''}">g</li>
                    <li data-pref="sa" class="sa map-area map-saga ${eachDataInfo.サービス提供エリア.includes('佐賀県') ? 'is-active' : ''}">h</li>
                    <li data-pref="sg" class="sg map-area map-shiga ${eachDataInfo.サービス提供エリア.includes('滋賀県') ? 'is-active' : ''}">i</li>
                    <li data-pref="sn" class="sn map-area map-shimane ${eachDataInfo.サービス提供エリア.includes('島根県') ? 'is-active' : ''}">j</li>
                    <li data-pref="so" class="so map-area map-shizuoka ${eachDataInfo.サービス提供エリア.includes('静岡県') ? 'is-active' : ''}">k</li>
                    <li data-pref="st" class="st map-area map-saitama ${eachDataInfo.サービス提供エリア.includes('埼玉県') ? 'is-active' : ''}">l</li>
                    <li data-pref="tg" class="tg map-area map-tochigi ${eachDataInfo.サービス提供エリア.includes('栃木県') ? 'is-active' : ''}">m</li>
                    <li data-pref="tk" class="tk map-area map-tokyo ${eachDataInfo.サービス提供エリア.includes('東京都') ? 'is-active' : ''}">n</li>
                    <li data-pref="to" class="to map-area map-tokushima ${eachDataInfo.サービス提供エリア.includes('徳島県') ? 'is-active' : ''}">o</li>
                    <li data-pref="tt" class="tt map-area map-tottori ${eachDataInfo.サービス提供エリア.includes('鳥取県') ? 'is-active' : ''}">p</li>
                    <li data-pref="ty" class="ty map-area map-toyama ${eachDataInfo.サービス提供エリア.includes('富山県') ? 'is-active' : ''}">q</li>
                    <li data-pref="wk" class="wk map-area map-wakayama ${eachDataInfo.サービス提供エリア.includes('和歌山県') ? 'is-active' : ''}">r</li>
                    <li data-pref="yg" class="yg map-area map-yamaguchi ${eachDataInfo.サービス提供エリア.includes('山口県') ? 'is-active' : ''}">s</li>
                    <li data-pref="ym" class="ym map-area map-yamagata ${eachDataInfo.サービス提供エリア.includes('山形県') ? 'is-active' : ''}">t</li>
                    <li data-pref="yn" class="yn map-area map-yamanashi ${eachDataInfo.サービス提供エリア.includes('山梨県') ? 'is-active' : ''}">u</li>
                  </ul>
                </td>
              </tr>
            </table>

            <table class="detail-table table-tenth">
              <tr class="table-heading-wrapper">
                <th class="table-primary-heading">営業対象職種</th>
              </tr>
              <tr class="table-data-wrapper">
                <td class="table-data data-checkbox">
                  <dl class="checkbox-wrapper">
                    <dt class="chechbox-heading">小売業</dt>
                    <dd class="checkbox-inner">
                      <span class="each-checkbox">
                        <input type="checkbox" id="overall" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.総合 === '有' ? 'checked="checked"' : ''}">
                        <span class="checkbox-parts"></span>
                        <label for="overall" class="checkbox-label">総合（非専門）</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="furniture" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.家具調度品 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="furniture" class="checkbox-label">家具・調度品</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="food" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.食料品 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="food" class="checkbox-label">食料品</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="hobby" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.書籍玩具音楽CD === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="hobby" class="checkbox-label">書籍・玩具・音楽CD</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="clothes" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.衣料品 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="clothes" class="checkbox-label">衣料品</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="e-commerce" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.EC通信販売 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="e-commerce" class="checkbox-label">EC・通信販売</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="precious-metal" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.貴金属服飾品 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="precious-metal" class="checkbox-label">貴金属・服飾品</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="gas-station" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.ガソリンスタンド === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="gas-station" class="checkbox-label">ガソリンスタンド</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="appliance" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.電化製品 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="appliance" class="checkbox-label">電化製品</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="other" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.その他小売業 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="other" class="checkbox-label">その他</label>
                      </span>
                    </dd>
                  </dl>
                  <dl class="checkbox-wrapper">
                    <dt class="chechbox-heading">サービス</dt>
                    <dd class="checkbox-inner">
                      <span class="each-checkbox">
                        <input type="checkbox" id="restaurant" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.飲食業 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="restaurant" class="checkbox-label">飲食業</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="transportation" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.運輸業 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="transportation" class="checkbox-label">運輸業</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="barber" class="checkbox-input" disabled="disabled" ${eachDataInfo.営業対象業種.理容美容業 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="barber" class="checkbox-label">理容・美容業</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="utility-charges" disabled="disabled" class="checkbox-input" ${eachDataInfo.営業対象業種.公共料金 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="utility-charges" class="checkbox-label">公共料金</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="lodging" disabled="disabled" class="checkbox-input" ${eachDataInfo.営業対象業種.宿泊業 === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="lodging" class="checkbox-label">宿泊業</label>
                      </span>
                      <span class="each-checkbox">
                        <input type="checkbox" id="other-service" disabled="disabled" class="checkbox-input" ${eachDataInfo.営業対象業種.その他サービス === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="other-service" class="checkbox-label">その他</label>
                      </span>
                      <span class="each-checkbox free-description-wrapper">
                        <input type="checkbox" id="free-description" disabled="disabled" class="checkbox-input" ${eachDataInfo.営業対象業種.その他自由記載サービス === '有' ? 'checked="checked"' : ''}>
                        <span class="checkbox-parts"></span>
                        <label for="free-description" class="checkbox-label">その他（自由記載サービス）</label>
                      </span>
                    </dd>
                  </dl>
                </td>
              </tr>
            </table>

          </div>
          `
          this.selectors.component.appendChild(createCompanyDetailElement)
        })

        if (info.対応可能な決済端末詳細.length > 0) {
          const createPaymentTerminalWrapperElement = document.createElement('div')
          createPaymentTerminalWrapperElement.classList.add('payment-terminal-wrapper')
          createPaymentTerminalWrapperElement.innerHTML = `
          <h4 class="payment-terminal-heading">対応可能な決済端末</h4>
          <div class="payment-terminal-inner fn-payment-terminal-inner"></div>
          `
          if (this.selectors.component) {
            this.selectors.component.appendChild(createPaymentTerminalWrapperElement)
          }

          info.対応可能な決済端末詳細.map(terminalDetailInfo => {
            const createPaymentTerminalInnerElement = document.createElement('dl')
            createPaymentTerminalInnerElement.classList.add('each-payment-terminal')
            // prettier-ignore
            createPaymentTerminalInnerElement.innerHTML = `
            <dt class="each-payment-terminal-heading fn-button-each-payment-terminal-heading">
              <span class="each-payment-terminal-image-wrapper">
                ${terminalDetailInfo.画像URL === '' ? '' : `<img src="/assets/img/${terminalDetailInfo.画像URL}" class="each-payment-terminal-image"/>` }
              </span>
              <span class="each-payment-terminal-number">${terminalDetailInfo.型番}</span>
            </dt>
            <dd class="each-payment-terminal-detail fn-each-payment-terminal-detail">
              <div class="payment-terminal-detail-heading-wrapper">
                <dl class="payment-terminal-detail-heading-inner">
                  <dt class="payment-terminal-detail-heading">メーカー名：</dt>
                  <dd class="payment-terminal-detail-letter">${terminalDetailInfo.メーカー名}</dd>
                </dl>
                <dl class="payment-terminal-detail-heading-inner">
                  <dt class="payment-terminal-detail-heading">種別：</dt>
                  <dd class="payment-terminal-detail-letter">${terminalDetailInfo.種別}</dd>
                </dl>
              </div>
              <table class="payment-terminal-table">
                <tr class="payment-terminal-table-list">
                  <th colspan="2" class="payment-terminal-table-primary-heading">主な仕様</th>
                </tr>
                <tr class="payment-terminal-table-list">
                  <th class="payment-terminal-table-secondary-heading">サイズ(mm)</th>
                  <td class="payment-terminal-table-letter">${terminalDetailInfo.サイズ}</td>
                </tr>
                <tr class="payment-terminal-table-list">
                  <th class="payment-terminal-table-secondary-heading">重量</th>
                  <td class="payment-terminal-table-letter">${terminalDetailInfo.重量}</td>
                </tr>
                <tr class="payment-terminal-table-list">
                  <th class="payment-terminal-table-secondary-heading">通信規格</th>
                  <td class="payment-terminal-table-letter">${terminalDetailInfo.通信規格}</td>
                </tr>
                <tr class="payment-terminal-table-list">
                  <th class="payment-terminal-table-secondary-heading">電源タイプ</th>
                  <td class="payment-terminal-table-letter">${terminalDetailInfo.電源タイプ}</td>
                </tr>
                <tr class="payment-terminal-table-list">
                  <th class="payment-terminal-table-secondary-heading">対応キャッシュレス区分</th>
                  <td class="payment-terminal-table-letter">${terminalDetailInfo.対応キャッシュレス区分.map((classificationInfo, classificationIndex) => classificationIndex + 1 < terminalDetailInfo.対応キャッシュレス区分.length ? `${classificationInfo}<br>` : `${classificationInfo}`).toString().replace(/,/g, '')}</td>
                </tr>
                <tr class="payment-terminal-table-list">
                  <th class="payment-terminal-table-secondary-heading">付属品</th>
                  <td class="payment-terminal-table-letter">${terminalDetailInfo.付属品.map((accessoriesInfo, accessoriesIndex) => accessoriesIndex + 1 < terminalDetailInfo.付属品.length ? `${accessoriesInfo}<br>` : `${accessoriesInfo}`).toString().replace(/,/g, '')}</td>
                </tr>
                <tr class="payment-terminal-table-list">
                  <th class="payment-terminal-table-secondary-heading">製品URL</th>
                  <td class="payment-terminal-table-letter"><a href="${terminalDetailInfo.製品URL}" target="_blank" class="payment-terminal-table-link">${terminalDetailInfo.製品URL}</a></td>
                </tr>
              </table>
            </dd>
            `
            document.querySelector('.fn-payment-terminal-inner').appendChild(createPaymentTerminalInnerElement)
          })
        }
      }
    })
  }

  togglePaymentTerminalDetail() {
    const getNodeList = document.querySelectorAll('.fn-button-each-payment-terminal-heading')
    Array.from(getNodeList, selector => {
      selector.addEventListener('click', event => {
        if (!event.currentTarget.nextElementSibling.classList.contains('is-active')) {
          Array.from(getNodeList, initializeSelector => {
            initializeSelector.nextElementSibling.classList.remove('is-active')
            initializeSelector.nextElementSibling.removeAttribute('style')
          })
          event.currentTarget.nextElementSibling.classList.add('is-active')
          event.currentTarget.nextElementSibling.style.top = `${event.currentTarget.clientHeight}px`
        } else {
          event.currentTarget.nextElementSibling.classList.remove('is-active')
          event.currentTarget.nextElementSibling.removeAttribute('style')
        }
      })
    })
  }

  async core() {
    await this.resolvedPromise(this.getData())
    this.getID()
    this.render()
    this.togglePaymentTerminalDetail()
  }

  resizeInit() {
    const getNodeList = document.querySelectorAll('.fn-each-payment-terminal-detail')
    if (getNodeList.length > 0) {
      Array.from(getNodeList, selector => {
        selector.classList.remove('is-active')
        selector.removeAttribute('style')
      })
    }
  }
}
