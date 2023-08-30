import type { ReactElement } from 'react'
// import Exif from '../../core/Exif'
// import { Image } from '../../core/Image'
// import RelatedPosts from '../../RelatedPosts'
import PostActions from './Actions'
import PostContent from './Content'
import PostLead from './Lead'
import PostLinkActions from './LinkActions'
import PostMeta from './Meta'
// import PrevNext from './PrevNext'
import PostTitle from './Title'
import styles from './index.module.css'

export default function Post({ entry }): ReactElement {
  const { title, image, linkurl, tags, updated } = entry.data
  const { slug, githubLink, date, type } = entry

  return (
    <>
      <article className={styles.hentry}>
        <header>
          <PostTitle
            linkurl={linkurl}
            title={title}
            date={date}
            updated={updated}
          />
        </header>

        {type === 'article' && <PostLead post={entry} />}
        {type === 'photo' && <PostContent post={entry} />}

        {/* {image && (
          <Image
            className={styles.image}
            image={(image as any).childImageSharp.gatsbyImageData}
            alt={title}
          />
        )} */}

        <PostContent post={entry} />

        {/* {type === 'photo' ? (
          image?.fields && (
            <Exif exif={image.fields.exif as Queries.ImageExif} />
          )
        ) : (
          <PostContent post={post} />
        )} */}

        {type === 'link' && <PostLinkActions slug={slug} linkurl={linkurl} />}
        <PostMeta post={entry} />
        {type !== 'photo' && <PostActions githubLink={githubLink} />}
      </article>

      {/* <RelatedPosts isPhotos={type === 'photo'} tags={tags as string[]} /> */}
      {/* <PrevNext prev={prev} next={next} /> */}
    </>
  )
}
