import React, { useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { jsonLanguage } from "@codemirror/lang-json";
import { yamlLanguage } from "@codemirror/lang-yaml";
import * as yml from "js-yaml";

import { useCodemirrorTheme } from "@/hooks/useCodemirrorTheme";
import SelectBox from "@/components/shared/SelectBox/SelectBox";
import CopyButton from "@/components/shared/CopyButton/CopyButton";

const CODE_TYPE_YAML = "yaml";
const CODE_TYPE_JSON = "json";

const OPTIONS = [
  { value: CODE_TYPE_YAML, label: "YAML" },
  { value: CODE_TYPE_JSON, label: "JSON" },
];

type SyntaxHighlighterProps = {
  data: object;
};

const SyntaxHighlighter: React.FunctionComponent<SyntaxHighlighterProps> = ({
  data,
}) => {
  const [codeLanguage, setCodeLanguage] = useState(CODE_TYPE_YAML);
  const theme = useCodemirrorTheme();

  const formattedCodeByLanguage = useMemo(() => {
    return codeLanguage == CODE_TYPE_YAML
      ? yml.dump(data, { lineWidth: -1 }).trim()
      : JSON.stringify(data, null, 2);
  }, [codeLanguage, data]);

  const languageExtension =
    codeLanguage === CODE_TYPE_JSON ? jsonLanguage : yamlLanguage;

  return (
    <div className="overflow-hidden rounded-md bg-primary-foreground">
      <div className="flex h-10 items-center justify-between border-b border-border pr-2">
        <SelectBox
          value={codeLanguage}
          onChange={setCodeLanguage}
          options={OPTIONS}
          className="w-fit"
          variant="ghost"
        />
        <CopyButton
          message="Successfully copied code"
          text={formattedCodeByLanguage}
          tooltipText="Copy code"
        />
      </div>
      <div>
        <CodeMirror
          theme={theme}
          value={formattedCodeByLanguage}
          extensions={[
            languageExtension,
            EditorView.lineWrapping,
            EditorState.readOnly.of(true),
            EditorView.editable.of(false),
          ]}
        />
      </div>
    </div>
  );
};

export default SyntaxHighlighter;
