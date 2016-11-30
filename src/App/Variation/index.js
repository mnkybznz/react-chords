import React from 'react'
import Helmet from 'react-helmet'
import Chord from '../../Chord'
import { Link } from 'react-router'
import Play from '../../Play'
import './styles.css'

const getDatabase = instrument =>
  require(`@tombatossals/chords-db/lib/${instrument}.json`)

const Variation = ({ params }) => {
  const name = params.instrument || 'guitar'
  const instrument = getDatabase(name)
  var suffix = params.suffix.replace('sharp', '#')
  const chord = instrument.chords[params.key].find(chord => chord.suffix === suffix)
  const variation = chord.positions[params.variation - 1]
  var key = params.key.replace('sharp', '#')
  console.log(key)
  return (
    <div className='Variation'>
      <Helmet
        htmlAttributes={{lang: 'en'}}
        title={`${instrument.main.name} ${params.key.replace('sharp', '#')} ${params.suffix} chord (Variation ${params.variation})`}
        meta={[
            { name: 'description', content: `Guitar and Ukelele chords database. ${instrument.main.name} ${params.key.replace('sharp', '#')} ${suffix} chord (Variation ${params.variation}).` }
        ]}
      />
      <h1>{instrument.main.name} {params.key.replace('sharp', '#')}<span className='suffix'>{suffix}</span> chord <span className='variation'>(Variation {params.variation})</span> <span className='return'>[ <Link to={`/react-chords/${name}/chords/${params.key}/${params.suffix}`}>return</Link> ]</span></h1>
      <div className='Chord'>
        <a href={`${process.env.PUBLIC_URL}/svg/${params.instrument}/chords/${params.key}/${params.suffix}/${params.key}-${params.suffix}-${params.variation}.svg`}>
          <Chord chord={chord} instrument={instrument.main} version={parseInt(params.variation, 10)} />
        </a>
        <Play chord={variation.midi} />
      </div>
    </div>)
}

Variation.propTypes = {
  params: React.PropTypes.shape({
    instrument: React.PropTypes.string,
    key: React.PropTypes.string,
    variation: React.PropTypes.string
  })
}

export default Variation

