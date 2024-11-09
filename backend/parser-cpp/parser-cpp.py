# -*- coding: utf-8 -*-

# --- CODELINGO C++ PARSER ---
# Author: Leo Cabezas Amigo

"""
IDEAS: Implement pointers, references, arrays
"""

import os
import json

cpp_data_types = [
    # PRIMITIVE TYPES
    'int',
    'float',
    'double',
    'char',
    'bool',
    'void',
    'wchar_t',
    'short',
    'long',
    'unsigned int',
    'unsigned long',
    'unsigned short',
    'signed char',
    'unsigned char',
    'long long',            # C++11 and later
    'unsigned long long',   # C++11 and later

    # HARDCODED COMPOUND TYPES
    'std::string'
]

next_chars = {
    "line_wspc"         :   [" ", "\t"],  # Is also: "begin_dtype"
    "end_dtype"         :   [" ", "\t", "=", ";", "("],
    "begin_keyword"     :   [" ", "\t", "(", "{", ";", ":"],
    "fwd_var_name"      :   [   ["="],
                                ["+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "++", "--"],
                                ["<<=", ">>="]
                            ],
    "bwd_var_name"      :   [   ["++", "--"]
                            ]
}

class Parser_CPP:
    def __init__(self, code_file, eval_file = None):
        self.code = self._read_src(code_file)
        self.code_lines = self._read_src(code_file, byLine = True)

        self.json_dict = {"code": self.code, "executionSteps": []}
        self.jsonResponse = ""

        """
        self.cpp_keywords_dict = {
            "if"        : self._parse_if,
            "else"      : self._parse_else,
            "switch"    : self._parse_switch,
            "case"      : self._parse_case,
            "default"   : self._parse_default,
            "for"       : self._parse_for,
            "while"     : self._parse_while,
            "do"        : self._parse_do,
            "break"     : self._parse_break,
            "continue"  : self._parse_continue,
            "return"    : self._parse_return,
            "goto"      : self._parse_goto,
            "throw"     : self._parse_throw,
            "try"       : self._parse_try,
            "catch"     : self._parse_catch
        }
        """

        self.scope_stack = []
        self.scope_stack.append(["__SCOPE__GLOBAL__", len(self.code_lines), {}])
        self.scope_registry = [] 
    
    def _read_src(self, file, byLine = False):  # DONE!
        try:
            file.seek(0)
            return file.read() if not byLine else file.readlines()
        except:
            raise Exception("Error. Could not open src_code file.")
        
    def _parse_dtype(self, dtype, i, line, step):   # DONE!
        LOOP_COND = lambda i: i < len(self.code)
        
        i += len(dtype) + 1
        highlight = line
        
        while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
            i += 1
        name_start = i
        while self.code[i] not in next_chars["end_dtype"] and LOOP_COND(i):
            i += 1
        name_end = i
        name = self.code[name_start:name_end]

        while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
            i += 1

        argv = [i, line, step, highlight, name, dtype]
        if self.code[i] in ["=", ";"]: # Means it's VAR_DECLARE
            i, line = self._parse_VAR_DECLARE(argv)
        elif self.code[i] == "(":   # Means it's FUNCT_DEFINE
            i, line = self._parse_FUNCT_DEFINE(argv)
        else:
            raise Exception("Error! Unknown dtype-init statement.")
        
        step += 1

        return i, line, step

if __name__ == "__main__":
    code_file = open("ideal_parser_test.cpp", 'r')

    parser = Parser_CPP(code_file)