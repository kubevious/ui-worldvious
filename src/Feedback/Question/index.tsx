import React, { FC, useState } from 'react';
import _ from "the-lodash"
import cx from "classnames"

import { Label, Textarea } from '@kubevious/ui-components';
import styles from './styles.module.css';

import { UserAnswer  } from "../types"
import { WorldviousFeedbackQuestion,
         WorldviousFeedbackQuestionKind
        } from '@kubevious/ui-middleware/dist/services/worldvious'

export interface QuestionProps
{
    question : WorldviousFeedbackQuestion;
    answer? : UserAnswer;
    isMissingAnswer: boolean;

    updateAnswer : (value: string[]) => void;
}

export const Question : FC<QuestionProps> = ({ question, answer, isMissingAnswer, updateAnswer }) => {

    const [hoverStars, setHoverStars] = useState<Record<string, boolean>>({});

    const currentValues = answer?.value ?? [];
    const currentValue = _.first(currentValues);

    const handleInputChange = (value : any) => {

        if (_.isNotNullOrUndefined(value)) {
            if (_.isString(value)) {
                if (value.length > 0) 
                {
                    updateAnswer([value]);
                    return;
                }
            }
            else 
            {
                updateAnswer([value]);
                return;
            }
        }

        updateAnswer([]);

    }

    const handleMultiselect = (option : string) => {

        const optionsDict = _.makeDict(answer?.value ?? [], x => x, () => true);

        if (optionsDict[option])
        {
            delete optionsDict[option];
        } else {
            optionsDict[option] = true;
        }

        updateAnswer(_.keys(optionsDict));
    }

    const renderQuestion = () => {
        switch (question.kind)
        {
            case WorldviousFeedbackQuestionKind.input:
                return (<div>

                    <Textarea 
                              onChange={(e) => handleInputChange(e.target.value)} />
                    
                </div>);

            case WorldviousFeedbackQuestionKind.rate:
                {
                    const hoverValues = _.keys(hoverStars).map(x => parseInt(x));
                    const hoverValue = _.max(hoverValues) ?? 0;

                    return (
                        <div
                            className={styles.rateStars}
                        >
                            {/* {JSON.stringify(hoverStars)} */}
                            {[1, 2, 3, 4, 5].map((val) => (
                                <span key={val} 
                                      onClick={() => handleInputChange(val)}
                                      onMouseEnter={() => {
                                        const dict = _.clone(hoverStars);
                                        dict[val] = true;
                                        setHoverStars(dict);
                                      }}
                                      onMouseLeave={() => {
                                        const dict = _.clone(hoverStars);
                                        delete dict[val];
                                        setHoverStars(dict);
                                      }}
                                      onMouseOut={() => {
                                        const dict = _.clone(hoverStars);
                                        delete dict[val];
                                        setHoverStars(dict);
                                      }}
                                      className={cx(styles.star,
                                        {
                                            [styles.hoverStar] : (_.isNotNullOrUndefined(hoverValue) && (val <= hoverValue)),
                                            [styles.checkedStar] : (_.isNotNullOrUndefined(currentValue) && (val <= currentValue)),
                                        }
                                    )}
                                    /> 
                            ))}
                        </div>
                    );
                }

            case WorldviousFeedbackQuestionKind.single_select:
                return <div className={styles.buttonsContainer}>
                    {question.options &&
                        question.options.map((option, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    name={question.id}
                                    className={cx(styles.selectButton, {[styles.selectButtonSelected]: currentValues.includes(option) })}
                                    onClick={() => handleInputChange(option)}
                                    value={option}
                                >
                                    {option}
                                </button>
                            )
                        })}
                </div>

            case WorldviousFeedbackQuestionKind.multi_select:
                return <div className={styles.buttonsContainer}>
                    {question.options &&
                        question.options.map((option, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    name={question.id}
                                    className={cx(styles.selectButton, {[styles.selectButtonSelected]: currentValues.includes(option) })}
                                    onClick={() => handleMultiselect(option)}
                                    value={option}
                                >
                                    {option}
                                </button>
                            )
                        })}
                </div>;

            default:
                return <>
                </>
        }
    }

    return <div className={styles.questionContainer}>

        <div className={styles.title}>
            <Label text={question.text}
                   className={cx({
                       [styles.nonOptionalLabel]: !question.optional,
                       [styles.missingValueLabel]: isMissingAnswer,
                    })} 
            
            />
        </div>

        {renderQuestion()}
    </div>
}
