import React from "react"
import PropTypes from "prop-types"
import getBackgroundStyles from './BackgroundUtils'

// Handle legacy names for image queries.
const convertProps = props => {
  let convertedProps = { ...props }
  if (convertedProps.resolutions) {
    convertedProps.fixed = convertedProps.resolutions
    delete convertedProps.resolutions
  }
  if (convertedProps.sizes) {
    convertedProps.fluid = convertedProps.sizes
    delete convertedProps.sizes
  }

  return convertedProps
}

// Cache if we've seen an image before so we don't both with
// lazy-loading & fading in on subsequent mounts.
const imageCache = {}
const inImageCache = props => {
  const convertedProps = convertProps(props)
  // Find src
  const src = convertedProps.fluid
      ? convertedProps.fluid.src
      : convertedProps.fixed.src

  if (imageCache[src]) {
    return true
  } else {
    imageCache[src] = true
    return false
  }
}

let io
const listeners = []

function getIO() {
  if (
      typeof io === `undefined` &&
      typeof window !== `undefined` &&
      window.IntersectionObserver
  ) {
    io = new window.IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            listeners.forEach(l => {
              if (l[0] === entry.target) {
                // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
                if (entry.isIntersecting || entry.intersectionRatio > 0) {
                  io.unobserve(l[0])
                  l[1]()
                }
              }
            })
          })
        },
        { rootMargin: `200px` }
    )
  }

  return io
}

const listenToIntersections = (el, cb) => {
  getIO().observe(el)
  listeners.push([el, cb])
}

const noscriptImg = props => {
  // Check if prop exists before adding each attribute to the string output below to prevent
  // HTML validation issues caused by empty values like width="" and height=""
  const src = props.src ? `src="${props.src}" ` : `src="" ` // required attribute
  const sizes = props.sizes ? `sizes="${props.sizes}" ` : ``
  const srcSetWebp = props.srcSetWebp ? `<source type='image/webp' srcSet="${props.srcSetWebp}" ${sizes}/>` : ``
  const srcSet = props.srcSet ? `<source srcSet="${props.srcSet}" ${sizes}/>` : ``
  const title = props.title ? `title="${props.title}" ` : ``
  const alt = props.alt ? `alt="${props.alt}" ` : `alt="" ` // required attribute
  const width = props.width ? `width="${props.width}" ` : ``
  const height = props.height ? `height="${props.height}" ` : ``
  const opacity = props.opacity ? props.opacity : `1`
  const transitionDelay = props.transitionDelay ? props.transitionDelay : `0.5s`
  return (`<picture>${srcSetWebp}${srcSet}<img ${width}${height}${src}${alt}${title}style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:${transitionDelay};opacity:${opacity};width:100%;height:100%;object-fit:cover;object-position:center"/></picture>`)
}

const Img = React.forwardRef((props, ref) => {
  const { style, onLoad, onError, alt, ...otherProps } = props

  return <img
      {...otherProps}
      onLoad={onLoad}
      onError={onError}
      alt={alt}
      ref={ref}
      style={{
        position: `absolute`,
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`,
        objectFit: `cover`,
        objectPosition: `center`,
        ...style,
      }}
  />
})

Img.propTypes = {
  style: PropTypes.object,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
}

class BackgroundImage extends React.Component {
  constructor(props) {
    super(props)

    // If this browser doesn't support the IntersectionObserver API
    // we default to start downloading the image right away.
    let isVisible = true
    let imgLoaded = true
    let IOSupported = false
    let fadeIn = props.fadeIn

    // If this image has already been loaded before then we can assume it's
    // already in the browser cache so it's cheap to just show directly.
    const seenBefore = inImageCache(props)

    if (
        !seenBefore &&
        typeof window !== `undefined` &&
        window.IntersectionObserver
    ) {
      isVisible = false
      imgLoaded = false
      IOSupported = true
    }

    // Always don't render image while server rendering
    if (typeof window === `undefined`) {
      isVisible = false
      imgLoaded = false
    }

    if (props.critical) {
      isVisible = true
      imgLoaded = false
      IOSupported = false
    }

    const hasNoScript =  !(this.props.critical && !this.props.fadeIn)

    this.state = {
      isVisible,
      imgLoaded,
      IOSupported,
      fadeIn,
      hasNoScript,
      seenBefore,
    }

    // Get background(-*) styles from CSS (e.g. Styled Components).
    this.backgroundStyles = getBackgroundStyles(this.props.className)

    this.imageRef = React.createRef()
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this.handleRef = this.handleRef.bind(this)
  }

  componentDidMount() {
    if (this.props.critical) {
      const img = this.imageRef.current
      if (img && img.complete) {
        this.handleImageLoaded()
      }
    }

  }

  handleRef(ref) {
    if (this.state.IOSupported && ref) {
      listenToIntersections(ref, () => {
        this.setState({ isVisible: true })
      })
    }
  }

  handleImageLoaded() {
    this.setState({ imgLoaded: true })
    if (this.state.seenBefore) {
      this.setState({ fadeIn: false })
    }
    this.props.onLoad && this.props.onLoad()
  }

  render() {
    const {
      title,
      alt,
      className,
      style = {},
      imgStyle = {},
      placeholderStyle = {},
      fluid,
      fixed,
      backgroundColor,
      Tag,
      id,
      children
    } = convertProps(this.props)

    const bgColor = typeof backgroundColor === `boolean` ? `lightgray` : backgroundColor

    const imagePlaceholderStyle = {
      opacity: this.state.imgLoaded ? 0 : 1,
      transition: `opacity 0.5s`,
      transitionDelay: this.state.imgLoaded ? `0.5s` : `0.25s`,
      ...imgStyle,
      ...placeholderStyle,
    }

    const imageStyle = {
      opacity: this.state.imgLoaded || this.state.fadeIn === false ? 1 : 0,
      transition: this.state.fadeIn === true ? `opacity 0.5s` : `none`,
      ...imgStyle,
    }


    if (fluid) {
      const image = fluid

      // Set the backgroundImage according to images available.
      // TODO: better transition
      let bgImage = ``
      if (image.tracedSVG) bgImage = `'${ image.tracedSVG }'`
      if (image.base64 && !image.tracedSVG) bgImage = image.base64
      if (this.state.isVisible) bgImage = image.src

      console.log(this.backgroundStyles)

      return (
          <Tag
              id={id}
              className={`${className ? className : ``} gatsby-image-wrapper`}
              style={{
                position: `relative`,
                overflow: `hidden`,
                backgroundImage: `url(${ bgImage })`,
                // backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                transition: `background 0.2s ease-in-out`,
                ...style,
                ...this.backgroundStyles,
              }}
              ref={this.handleRef}
              key={`fluid-${JSON.stringify(image.srcSet)}`}
          >
            {/* Show the blurry base64 image. */}
            {image.base64 && (
                <Img
                    alt={!this.state.isVisible ? alt : ``}
                    title={title}
                    src={image.base64}
                    style={{...imagePlaceholderStyle,
                      // Prevent Gatsby Image from being shown, as we only need it for the Backgrounds.
                      display: `none`,
                    }}
                />
            )}

            {/* Show the traced SVG image. */}
            {image.tracedSVG && (
                <Img
                    alt={!this.state.isVisible ? alt : ``}
                    title={title}
                    src={image.tracedSVG}
                    style={{...imagePlaceholderStyle,
                      // Prevent Gatsby Image from being shown, as we only need it for the Backgrounds.
                      display: `none`,
                    }}
                />
            )}

            {/* Show a solid background color. */}
            {bgColor && (
                <Tag
                    title={title}
                    style={{
                      backgroundColor: bgColor,
                      position: `absolute`,
                      top: 0,
                      bottom: 0,
                      opacity: !this.state.imgLoaded ? 1 : 0,
                      transitionDelay: `0.35s`,
                      right: 0,
                      left: 0,
                    }}
                />
            )}

            {/* Once the image is visible (or the browser doesn't support IntersectionObserver), start downloading the image */}
            {this.state.isVisible && (
                <picture style={{
                  // Prevent Gatsby Image from being shown, as we only need it for the Backgrounds.
                  display: `none`,
                }}>
                  {image.srcSetWebp && (<source
                      type={`image/webp`}
                      srcSet={image.srcSetWebp}
                      sizes={image.sizes}
                  />)}

                  <source
                      srcSet={image.srcSet}
                      sizes={image.sizes}
                  />

                  <Img
                      alt={alt}
                      title={title}
                      src={image.src}
                      style={imageStyle}
                      ref={this.imageRef}
                      onLoad={this.handleImageLoaded}
                      onError={this.props.onError}
                  />
                </picture>
            )}

            {/* Show the original image during server-side rendering if JavaScript is disabled */}
            {this.state.hasNoScript && (
                <noscript
                    dangerouslySetInnerHTML={{
                      __html: noscriptImg({ alt, title, ...image }),
                    }}
                />
            )}
            {children}
          </Tag>
      )
    }

    if (fixed) {
      const image = fixed
      const divStyle = {
        position: `relative`,
        overflow: `hidden`,
        display: `inline-block`,
        width: image.width,
        height: image.height,
        ...style,
      }

      if (style.display === `inherit`) {
        delete divStyle.display
      }

      // Set the backgroundImage according to images available.
      // TODO: better transition
      let bgImage = ``
      if (image.tracedSVG) bgImage = `'${ image.tracedSVG }'`
      if (image.base64 && !image.tracedSVG) bgImage = image.base64
      if (this.state.isVisible) bgImage = image.src

      return (
          <Tag
              id={id}
              className={`${className ? className : ``} gatsby-image-wrapper`}
              style={{
                position: `relative`,
                overflow: `hidden`,
                backgroundImage: `url(${ bgImage })`,
                // backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                transition: `background 0.2s ease-in-out`,
                ...divStyle,
                ...this.backgroundStyles,
              }}
              ref={this.handleRef}
              key={`fixed-${JSON.stringify(image.srcSet)}`}
          >
            {/* Show the blurry base64 image. */}
            {image.base64 && (
                <Img
                    alt={!this.state.isVisible ? alt : ``}
                    title={title}
                    src={image.base64}
                    style={{...imagePlaceholderStyle,
                      // Prevent Gatsby Image from being shown, as we only need it for the Backgrounds.
                      display: `none`,
                    }}
                />
            )}

            {/* Show the traced SVG image. */}
            {image.tracedSVG && (
                <Img
                    alt={!this.state.isVisible ? alt : ``}
                    title={title}
                    src={image.tracedSVG}
                    style={{...imagePlaceholderStyle,
                      // Prevent Gatsby Image from being shown, as we only need it for the Backgrounds.
                      display: `none`,
                    }}
                />
            )}

            {/* Show a solid background color. */}
            {bgColor && (
                <Tag
                    title={title}
                    style={{
                      backgroundColor: bgColor,
                      width: image.width,
                      opacity: !this.state.imgLoaded ? 1 : 0,
                      transitionDelay: `0.25s`,
                      height: image.height,
                    }}
                />
            )}

            {/* Once the image is visible, start downloading the image */}
            {this.state.isVisible && (
                <picture style={{
                  // Prevent Gatsby Image from being shown, as we only need it for the Backgrounds.
                  display: `none`,
                }}>
                  {image.srcSetWebp && (<source
                      type={`image/webp`}
                      srcSet={image.srcSetWebp}
                      sizes={image.sizes}
                  />)}

                  <source
                      srcSet={image.srcSet}
                      sizes={image.sizes}
                  />

                  <Img
                      alt={alt}
                      title={title}
                      width={image.width}
                      height={image.height}
                      src={image.src}
                      style={imageStyle}
                      ref={this.imageRef}
                      onLoad={this.handleImageLoaded}
                      onError={this.props.onError}
                  />
                </picture>
            )}

            {/* Show the original image during server-side rendering if JavaScript is disabled */}
            {this.state.hasNoScript && (
                <noscript
                    dangerouslySetInnerHTML={{
                      __html: noscriptImg({
                        alt,
                        title,
                        width: image.width,
                        height: image.height,
                        ...image,
                      }),
                    }}
                />
            )}
          </Tag>
      )
    }

    return null
  }
}

BackgroundImage.defaultProps = {
  critical: false,
  fadeIn: true,
  alt: ``,
  Tag: `div`,
}

const fixedObject = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  base64: PropTypes.string,
  tracedSVG: PropTypes.string,
  srcWebp: PropTypes.string,
  srcSetWebp: PropTypes.string,
})

const fluidObject = PropTypes.shape({
  aspectRatio: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  sizes: PropTypes.string.isRequired,
  base64: PropTypes.string,
  tracedSVG: PropTypes.string,
  srcWebp: PropTypes.string,
  srcSetWebp: PropTypes.string,
})

BackgroundImage.propTypes = {
  resolutions: fixedObject,
  sizes: fluidObject,
  fixed: fixedObject,
  fluid: fluidObject,
  fadeIn: PropTypes.bool,
  title: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Support Glamor's css prop.
  critical: PropTypes.bool,
  style: PropTypes.object,
  imgStyle: PropTypes.object,
  placeholderStyle: PropTypes.object,
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  Tag: PropTypes.string,
  id: PropTypes.string,
}

export default BackgroundImage
