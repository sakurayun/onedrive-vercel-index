import { useEffect, FunctionComponent } from 'react'
import Prism from 'prismjs'

import { getExtension } from '../../utils/getFileIcon'
import { useStaleSWR } from '../../utils/fetchWithSWR'
import FourOhFour from '../FourOhFour'
import Loading from '../Loading'
import DownloadButtonGroup from '../DownloadBtnGtoup'

const CodePreview: FunctionComponent<{ file: any }> = ({ file }) => {
  const { data, error } = useStaleSWR({ url: file['@microsoft.graph.downloadUrl'] })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [data])

  if (error) {
    return (
      <div className="dark:bg-gray-900 p-3 bg-white rounded">
        <FourOhFour errorMsg={error.message} />
      </div>
    )
  }
  if (!data) {
    return (
      <div className="dark:bg-gray-900 p-3 bg-white rounded">
        <Loading loadingText="Loading file content..." />
      </div>
    )
  }

  return (
    <div>
      <div className="markdown-body p-3 bg-gray-900 rounded">
        <pre className={`language-${getExtension(file.name)}`}>
          <code>{data}</code>
        </pre>
      </div>
      <div className="border-t-gray-200 dark:border-t-gray-700 border-t p-2 sticky bottom-0 left-0 right-0 z-10 bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-900">
        <DownloadButtonGroup downloadUrl={file['@microsoft.graph.downloadUrl']} />
      </div>
    </div>
  )
}

export default CodePreview
