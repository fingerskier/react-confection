import {useUrl} from 'react-confection'


export default function UrlRouting() {
  const { context, query, goto } = useUrl()


  return <div>
    <ul>
      <pre>{JSON.stringify({context,query}, null, 2)}</pre>
      <li><a href="?flarn=1#asdf">flarn 1</a></li>
      <li><a href="?flarn=2#asdf/qwer">flarn 2</a></li>
      <li><a href="?flarn=3#asdf/qwer/zxcv">flarn 3</a></li>
      <li>
        <button onClick={() => goto('qwer', {flarn: '5'}, true)}>goto #qwer, replace ?flarn=5</button>
      </li>
      <li>
        <button onClick={() => goto('asdf', {flarn: '4'})}>goto #asdf, retain ?flarn=4</button>
      </li>
      <li>
        <button onClick={() => goto('asdf')}>goto #asdf, retain</button>
      </li>
      <li>
        <button onClick={() => goto('qwer', {crum:13}, true)}>goto #qwer, replace ?crum=13</button>
      </li>
      <li>
        <button onClick={() => goto(null, {flarn: '6'}, true)}>stay, replace ?flarn=6</button>
      </li>
      <li>
        <button onClick={() => goto(null, {flarn: '7'})}>stay, retain ?flacd dern=7</button>
      </li>
    </ul>
  </div>
}
