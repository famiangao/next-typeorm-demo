import {spans} from "next/dist/build/webpack/plugins/profiling-plugin";

export interface IOptions {
    maxPage: number,
    currentPage: number,
    showCount: number,
    onChange: (page: number) => void
}


export const usePager = (options: IOptions) => {
    let {maxPage, currentPage, showCount, onChange} = options
    let showArr = [1];

    for (let i = currentPage - 3; i <= currentPage + 3; i++) {
        if (i > 1 && i < maxPage) {
            showArr.push(i)
        }
    }
    showArr.push(maxPage)
    showArr = showArr.reduce((last, now) => {
        if (now - last[last.length - 1] > 1) {
            last.push(-1);
        }
        last.push(now);
        return last;
    }, [])
    let pager = (
        <div className="wrapper">
            {currentPage>1&&
                <span className="arrow" onClick={() => {
                    onChange(currentPage-1);
                }}>&lt;</span>
            }
            {showArr.map(el => {
                return (
                    <span>
                        {el === -1 ?
                            (<span>...</span>)
                            :
                            el == currentPage ?
                                (<span>
                                    {el}
                                </span>)
                                :

                                (<span className="linkSpan" onClick={() => {
                                    onChange(el);
                                }
                                }> {el} </span>)
                        }
                    </span>
                )
            })}
            {
                currentPage<maxPage &&

                (<span className="arrow" onClick={()=>{

                    onChange(currentPage+1);
                    }}>&gt;</span>)
            }
            <style jsx>{`
              .wrapper {
                margin: 0 -8px;
              }

              .wrapper > .linkSpan, .wrapper > span {
                margin: 0 8px;
              }

              .linkSpan {
                color: #76c8e2;
                text-decoration: underline;
                cursor: pointer;
              }
              .arrow{
              cursor: pointer;
              }
            `}</style>
        </div>
    )
    return {
        pager
    }
}